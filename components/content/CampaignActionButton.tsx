"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/trackEvent";

interface CampaignActionButtonProps {
  campaignSlug: string;
  campaignId: string;
  label?: string;
}

export function CampaignActionButton({
  campaignSlug,
  campaignId,
  label = "Donate to this campaign",
}: CampaignActionButtonProps) {
  const handleClick = () => {
    trackEvent("campaign_action", {
      campaign: campaignSlug,
      action: "donate_intent",
    });
  };

  return (
    <Button
      variant="primary"
      className="w-full text-body"
      nativeButton={false}
      render={
        <Link
          href={`/donate?campaign=${campaignId}`}
          onClick={handleClick}
        />
      }
    >
      {label}
    </Button>
  );
}
