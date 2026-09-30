"use client";

import { Download } from"lucide-react";
import { Button } from"@/components/ui/button";
import { trackEvent } from"@/lib/analytics/trackEvent";

interface ReportDownloadButtonProps {
  id: string;
  title: string;
  downloadUrl: string;
}

export function ReportDownloadButton({
  id,
  title,
  downloadUrl,
}: ReportDownloadButtonProps) {
  const handleDownload = () => {
    trackEvent("report_download", { reportId: id, title });
  };

  return (
    <Button
      variant="secondary"
      className="gap-2 w-full md:w-auto"
      nativeButton={false}
      render={
        <a
          href={downloadUrl}
          download
          onClick={handleDownload}
          aria-label={`Download ${title}`}
        />
      }
    >
      <Download className="size-4" /> Download
    </Button>
  );
}
