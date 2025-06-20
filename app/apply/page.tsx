"use client";
import * as React from "react";
import { ChevronLeft } from "lucide-react";
import FormStepper from "@/components/ui/stepper";
import Link from "next/link";
import {
  UserCircle,
  Building2,
  DollarSign,
  FileText,
  Users,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import Plans from "@/components/membership-plans";
import PDFVerifier from "@/components/IDVerification/PDFVerifier";
import BackgroundCheck from "@/components/BackgroundCheck";
import ApplicationForm from "@/components/ApplicationForm";
import { RentalAgreement } from "@/components/Documents/RentalAgreement";
import SubmitApplication from "@/components/SubmitApplication";

const steps = [
  {
    title: "Membership Plans",
    description: "Optional",
    icon: UserCircle,
    content: <Plans />,
  },
  {
    title: "ID Verification",
    icon: Building2,
    content: (
      <PDFVerifier
        reportType="ID verification"
        verificationParams={{
          title: ["ID Verification Result"],
          keywordsLength: 3,
        }}
      />
    ),
  },
  {
    title: "Credit Check",
    icon: DollarSign,
    content: (
      <PDFVerifier
        reportType="credit"
        verificationParams={{
          title: ["Basic Credit Report", "Full Credit Report"],
          keywordsLength: 2,
        }}
      />
    ),
  },
  {
    title: "AI Background Check",
    icon: Users,
    content: <BackgroundCheck />,
  },
  {
    title: "Application Form",
    icon: FileText,
    content: <ApplicationForm />,
  },
  {
    title: "Signatures",
    icon: CheckCircle,
    content: <RentalAgreement />,
  },
  {
    title: "Confirmation",
    description: "Deposit Reminder",
    icon: CreditCard,
    content: <SubmitApplication />,
  },
];

export default function Home() {
  const [slug, setSlug] = React.useState(""); //
  const [lastSavedStep, setLastSavedStep] = React.useState(0);

  React.useEffect(() => {
    const last_step = localStorage.getItem("last_saved_step");
    const rentalInfo = localStorage.getItem("rental_and_applicant_info");
    if (last_step) {
      setLastSavedStep(JSON.parse(last_step));
    }
    if (rentalInfo) {
      const parsedRentalInfo = JSON.parse(rentalInfo);
      setSlug(parsedRentalInfo.slug);
    }
  }, []);

  return (
    <div className="md:mt-3 flex-col md:flex justify-start h-screen items-start gap-4 md:gap-0">
      <div className="p-2 hover:bg-blue-100 ml-2.5 w-[40px] h-[40px] rounded-full ">
        <Link href={`/?slug=${slug}`} className="">
          <ChevronLeft />
        </Link>
      </div>
      <FormStepper steps={steps} lastSavedStep={lastSavedStep} />
    </div>
  );
}
