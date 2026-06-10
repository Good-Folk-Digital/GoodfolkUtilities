import type { Metadata } from "next";

export const metadata: Metadata = {
title: "How Much Does Electricity Cost Per Month?",
description:
"Learn how electricity bills are calculated, what affects energy costs, and how to estimate your monthly power bill.",
};

export default function ElectricityCostBlogLayout({
children,
}: {
children: React.ReactNode;
}) {
return children;
}
