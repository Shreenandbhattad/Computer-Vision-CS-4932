const partASummaryRows = [
    { threshold_frac: "0.0001", precision: "0.0411", recall: "0.8958", TP: "43", FP: "1004", FN: "5", detected_count: "1047", gt_count: "48" },
    { threshold_frac: "0.026411", precision: "0.0617", recall: "0.6667", TP: "32", FP: "487", FN: "16", detected_count: "519", gt_count: "48" },
    { threshold_frac: "0.052721", precision: "0.0641", recall: "0.5208", TP: "25", FP: "365", FN: "23", detected_count: "390", gt_count: "48" },
    { threshold_frac: "0.079032", precision: "0.0386", recall: "0.2292", TP: "11", FP: "274", FN: "37", detected_count: "285", gt_count: "48" },
    { threshold_frac: "0.105342", precision: "0.0227", recall: "0.1042", TP: "5", FP: "215", FN: "43", detected_count: "220", gt_count: "48" },
    { threshold_frac: "0.131653", precision: "0.017", recall: "0.0625", TP: "3", FP: "173", FN: "45", detected_count: "176", gt_count: "48" },
    { threshold_frac: "0.157963", precision: "0.0199", recall: "0.0625", TP: "3", FP: "148", FN: "45", detected_count: "151", gt_count: "48" },
    { threshold_frac: "0.184274", precision: "0.0242", recall: "0.0625", TP: "3", FP: "121", FN: "45", detected_count: "124", gt_count: "48" },
    { threshold_frac: "0.210584", precision: "0.0104", recall: "0.0208", TP: "1", FP: "95", FN: "47", detected_count: "96", gt_count: "48" },
    { threshold_frac: "0.236895", precision: "0.0125", recall: "0.0208", TP: "1", FP: "79", FN: "47", detected_count: "80", gt_count: "48" },
    { threshold_frac: "0.263205", precision: "0.0164", recall: "0.0208", TP: "1", FP: "60", FN: "47", detected_count: "61", gt_count: "48" },
    { threshold_frac: "0.289516", precision: "0.02", recall: "0.0208", TP: "1", FP: "49", FN: "47", detected_count: "50", gt_count: "48" },
    { threshold_frac: "0.315826", precision: "0.0238", recall: "0.0208", TP: "1", FP: "41", FN: "47", detected_count: "42", gt_count: "48" },
    { threshold_frac: "0.342137", precision: "0.0278", recall: "0.0208", TP: "1", FP: "35", FN: "47", detected_count: "36", gt_count: "48" },
    { threshold_frac: "0.368447", precision: "0.0333", recall: "0.0208", TP: "1", FP: "29", FN: "47", detected_count: "30", gt_count: "48" },
    { threshold_frac: "0.394758", precision: "0.0385", recall: "0.0208", TP: "1", FP: "25", FN: "47", detected_count: "26", gt_count: "48" },
    { threshold_frac: "0.421068", precision: "0.0476", recall: "0.0208", TP: "1", FP: "20", FN: "47", detected_count: "21", gt_count: "48" },
    { threshold_frac: "0.447379", precision: "0.0667", recall: "0.0208", TP: "1", FP: "14", FN: "47", detected_count: "15", gt_count: "48" },
    { threshold_frac: "0.473689", precision: "0.0833", recall: "0.0208", TP: "1", FP: "11", FN: "47", detected_count: "12", gt_count: "48" },
    { threshold_frac: "0.5", precision: "0.1", recall: "0.0208", TP: "1", FP: "9", FN: "47", detected_count: "10", gt_count: "48" }
];

const overlayFiles = [
    "overlay_0.0001.png",
    "overlay_0.0023.png",
    "overlay_0.0045.png",
    "overlay_0.0067.png",
    "overlay_0.0089.png",
    "overlay_0.0112.png",
    "overlay_0.0134.png",
    "overlay_0.0156.png",
    "overlay_0.0178.png",
    "overlay_0.0200.png",
    "overlay_0.0460.png",
    "overlay_0.0720.png",
    "overlay_0.0980.png",
    "overlay_0.1240.png",
    "overlay_0.1500.png",
    "overlay_0.2667.png",
    "overlay_0.3833.png",
    "overlay_0.5000.png",
    "overlay_0.6000.png",
    "overlay_0.7000.png",
    "overlay_0.8000.png"
];

const summaryTable = document.getElementById("partASummaryTable");
if (summaryTable) {
    const headers = ["threshold_frac", "precision", "recall", "TP", "FP", "FN", "detected_count", "gt_count"];
    summaryTable.innerHTML = `
        <thead>
            <tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
            ${partASummaryRows.map((row) => `
                <tr>${headers.map((header) => `<td>${row[header]}</td>`).join("")}</tr>
            `).join("")}
        </tbody>
    `;
}

const overlayGrid = document.getElementById("partAOverlayGrid");
if (overlayGrid) {
    overlayGrid.innerHTML = overlayFiles.map((fileName) => {
        const label = fileName.replace("overlay_", "").replace(".png", "");
        const imagePath = `part-a/overlays/${fileName}`;
        return `
            <a class="overlay-card" href="${imagePath}" target="_blank" rel="noreferrer">
                <img src="${imagePath}" alt="Harris overlay at threshold ${label}">
                <span>Threshold ${label}</span>
            </a>
        `;
    }).join("");
}
