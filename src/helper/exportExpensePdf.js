// Builds and downloads a shareable PDF summary of one calculator (expense).
// pdfmake (+ its bundled Roboto font, which covers Vietnamese) is ~1MB, so it is
// only loaded when the user actually exports.
import { getExpenseTotals } from "./expenseTotals";

const COLORS = {
  text: "#211922",
  muted: "#62625b",
  primary: "#e60023",
  success: "#103c25",
  error: "#9e0a0a",
  headerFill: "#f6f6f3",
  line: "#e5e5e0",
};

const formatNumber = (num) =>
  Number(num || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

const formatMoney = (amount, currency = "VND") => `${formatNumber(amount)} ${currency}`;

const round2 = (num) => Math.round((Number(num) || 0) * 100) / 100;

const formatDate = (date) =>
  new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

const tableLayout = {
  hLineWidth: (i, node) => (i === 0 || i === node.table.body.length ? 0 : 0.5),
  vLineWidth: () => 0,
  hLineColor: () => COLORS.line,
  fillColor: (rowIndex) => (rowIndex === 0 ? COLORS.headerFill : null),
  paddingTop: () => 6,
  paddingBottom: () => 6,
  paddingLeft: () => 6,
  paddingRight: () => 6,
};

const headerCell = (text, alignment = "left") => ({ text, style: "tableHeader", alignment });

const participantStatus = (participant) => {
  const finalBalance = round2((participant.balance || 0) - (participant.paid || 0));
  const currency = participant.currency || "VND";
  if (finalBalance > 0) {
    return { text: `Nhận lại ${formatMoney(finalBalance, currency)}`, color: COLORS.success };
  }
  if (finalBalance < 0) {
    return { text: `Đóng thêm ${formatMoney(-finalBalance, currency)}`, color: COLORS.error };
  }
  return { text: "Đã đủ", color: COLORS.muted };
};

const summaryBlock = (label, value, color = COLORS.text) => ({
  stack: [
    { text: label, style: "summaryLabel" },
    { text: value, style: "summaryValue", color },
  ],
});

export const buildExpensePdfDefinition = (expense, exportedAt = new Date()) => {
  const participants = expense.participants || [];
  const payments = expense.payments || [];

  const {
    totalDeposit: totalContributedVND,
    totalSpent: totalSpentVND,
    remaining: remainingVND,
  } = getExpenseTotals(expense);

  const participantRows = participants.map((p) => {
    const currency = p.currency || "VND";
    const status = participantStatus(p);
    return [
      { text: p.name, bold: true },
      { text: formatMoney(p.balance, currency), alignment: "right", noWrap: true },
      { text: formatMoney(p.paid, currency), alignment: "right", noWrap: true },
      { text: status.text, color: status.color, bold: true, alignment: "right", noWrap: true },
    ];
  });

  const paymentRows = payments.map((payment, index) => {
    const currency = payment.currency || "VND";
    const sharedBy = payment.participants || [];
    const perPerson = sharedBy.length ? payment.amount / sharedBy.length : 0;
    return [
      { text: String(index + 1), color: COLORS.muted },
      {
        stack: [
          { text: payment.title, bold: true },
          ...(payment.description ? [{ text: payment.description, style: "muted" }] : []),
        ],
      },
      { text: formatMoney(payment.amount, currency), alignment: "right", color: COLORS.error, noWrap: true },
      { text: sharedBy.join(", ") || "—" },
      { text: formatMoney(perPerson, currency), alignment: "right", noWrap: true },
    ];
  });

  return {
    pageSize: "A4",
    pageMargins: [40, 48, 40, 56],
    info: { title: `${expense.title} - Chia tiền`, creator: "Play and Share" },
    defaultStyle: { font: "Roboto", fontSize: 10, color: COLORS.text, lineHeight: 1.2 },
    footer: (currentPage, pageCount) => ({
      margin: [40, 16, 40, 0],
      columns: [
        { text: "Play and Share • playandshare.netlify.app", style: "muted" },
        { text: `Trang ${currentPage}/${pageCount}`, style: "muted", alignment: "right" },
      ],
    }),
    content: [
      { text: "BẢNG CHIA TIỀN", style: "eyebrow" },
      { text: expense.title, style: "title" },
      {
        text: [
          `${participants.length} người tham gia • ${payments.length} khoản chi`,
          expense.updatedAt ? ` • Cập nhật ${formatDate(expense.updatedAt)}` : "",
          ` • Xuất ngày ${formatDate(exportedAt)}`,
        ].join(""),
        style: "muted",
        margin: [0, 0, 0, 16],
      },
      {
        columns: [
          summaryBlock("Tổng đã đóng", formatMoney(totalContributedVND)),
          summaryBlock("Tổng đã chi", formatMoney(totalSpentVND), COLORS.error),
          summaryBlock(
            remainingVND >= 0 ? "Còn lại" : "Còn thiếu",
            formatMoney(Math.abs(remainingVND)),
            remainingVND >= 0 ? COLORS.success : COLORS.error
          ),
        ],
        columnGap: 12,
        margin: [0, 0, 0, 20],
      },

      { text: "Người tham gia", style: "sectionTitle" },
      {
        table: {
          headerRows: 1,
          widths: ["*", "auto", "auto", "auto"],
          dontBreakRows: true,
          body: [
            [
              headerCell("Tên"),
              headerCell("Đã đóng", "right"),
              headerCell("Đã chi", "right"),
              headerCell("Kết quả", "right"),
            ],
            ...(participantRows.length
              ? participantRows
              : [[{ text: "Chưa có người tham gia", colSpan: 4, style: "muted" }, {}, {}, {}]]),
          ],
        },
        layout: tableLayout,
        margin: [0, 0, 0, 6],
      },
      {
        text: "Nhận lại: số tiền đã đóng nhiều hơn phần đã chi. Đóng thêm: phần đã chi nhiều hơn số tiền đã đóng.",
        style: "note",
        margin: [0, 0, 0, 20],
      },

      { text: "Các khoản chi", style: "sectionTitle" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "*", "auto", "*", "auto"],
          dontBreakRows: true,
          body: [
            [
              headerCell("#"),
              headerCell("Khoản chi"),
              headerCell("Số tiền", "right"),
              headerCell("Chia cho"),
              headerCell("Mỗi người", "right"),
            ],
            ...(paymentRows.length
              ? paymentRows
              : [[{ text: "Chưa có khoản chi nào", colSpan: 5, style: "muted" }, {}, {}, {}, {}]]),
          ],
        },
        layout: tableLayout,
      },
    ],
    styles: {
      eyebrow: { fontSize: 9, bold: true, color: COLORS.primary, characterSpacing: 1 },
      title: { fontSize: 22, bold: true, margin: [0, 2, 0, 4] },
      muted: { fontSize: 9, color: COLORS.muted },
      note: { fontSize: 8, italics: true, color: COLORS.muted },
      sectionTitle: { fontSize: 13, bold: true, margin: [0, 0, 0, 8] },
      tableHeader: { fontSize: 9, bold: true, color: COLORS.muted },
      summaryLabel: { fontSize: 9, color: COLORS.muted },
      summaryValue: { fontSize: 14, bold: true, margin: [0, 2, 0, 0] },
    },
  };
};

const toFileName = (title) => {
  const safeTitle = String(title || "chia-tien")
    .replace(/[\\/:*?"<>|]+/g, "")
    .trim();
  return `${safeTitle || "chia-tien"} - chia tien.pdf`;
};

const loadPdfMake = async () => {
  const [{ default: pdfMake }, { default: vfs }] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts"),
  ]);
  pdfMake.addVirtualFileSystem(vfs);
  return pdfMake;
};

export const createExpensePdfFile = async (expense) => {
  const pdfMake = await loadPdfMake();
  const blob = await new Promise((resolve, reject) => {
    try {
      pdfMake.createPdf(buildExpensePdfDefinition(expense)).getBlob(resolve);
    } catch (error) {
      reject(error);
    }
  });
  return new File([blob], toFileName(expense.title), { type: "application/pdf" });
};

export const downloadFile = (file) => {
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};

// Web Share API with files: Android/iOS share sheet (Zalo, Messenger, mail...)
export const canShareFiles = () => {
  if (typeof navigator === "undefined" || !navigator.canShare) return false;
  try {
    return navigator.canShare({
      files: [new File([""], "test.pdf", { type: "application/pdf" })],
    });
  } catch {
    return false;
  }
};

export const shareFile = (file, title) => navigator.share({ files: [file], title });
