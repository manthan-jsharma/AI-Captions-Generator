import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  // Dynamically get the icon component from Lucide
  const IconComponent = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as LucideIcon;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="p-2 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
          {IconComponent && (
            <IconComponent className="h-6 w-6 text-purple-600" />
          )}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
