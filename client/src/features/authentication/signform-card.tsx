import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Logo from "@/components/logo";
import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";

interface SignFormCardProps extends PropsWithChildren {
  title: string;
  footer: string;
  link: string;
}

export default function SignFormCard({
  title,
  footer,
  link,
  children,
}: SignFormCardProps) {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="flex flex-col items-center gap-3">
        <Logo />
        <p className="text-sm">{title}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex justify-center">
        <Link className="text-xs hover:underline" to={link}>
          {footer}
        </Link>
      </CardFooter>
    </Card>
  );
}
