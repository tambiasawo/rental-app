import React, { useState } from "react";
import { ProspectInfo, BackgroundCheckResult } from "@/types";
import ResultsPanel from "./ResultsPanel";
import { useRentalApplicationContext } from "@/contexts/rental-application-context";
import { Form } from "./Form";

export default function BackgroundCheck() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const inputFields = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    city2: "",
    state2: "",
    lengthOfStay: "yes",
  };

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProspectInfo, string>>
  >({});

  const toggleErrors = (name: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };
  const validateForm = (formData: ProspectInfo): boolean => {
    const newErrors: Partial<Record<keyof ProspectInfo, string>> = {};
    let isValid = true;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "city2" && key !== "state2") {
        newErrors[key as keyof ProspectInfo] = "This field is required";
        isValid = false;
      }
      if (formData["lengthOfStay"] === "no") {
        if (!formData["city2"]) {
          newErrors["city2"] = "This field is required";
          isValid = false;
        }
        if (!formData["state2"]) {
          newErrors["state2"] = "This field is required";
          isValid = false;
        }
      } else if (formData["lengthOfStay"] === "yes") {
        formData["city2"] = undefined;
        formData["state2"] = undefined;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const [results, setResults] = useState<BackgroundCheckResult | null>(null);
  const { updateRentApplicationStatus, updateStepOutput } =
    useRentalApplicationContext();

  const handleSubmit = async (prospectInfo: ProspectInfo) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/background-check", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...prospectInfo }),
      });
      if (!response.ok)
        throw new Error("A network error occured. Please try again");
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResults(data);
      updateRentApplicationStatus(4);
      updateStepOutput(data);
    } catch (error) {
      console.error("Error performing background check:", error);
      setApiError(
        error instanceof Error ? error.message : "Something Unexpected Happened"
      );
    } finally {
      setIsLoading(false);
    }
  };
  console.log({ apiError });
  return (
    <main
      className={`md:container mx-auto md:px-4 px-1 py-3 md:py-8 ${
        results ? "h-[500px]" : "max-h-[60vh]"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/*     {!results ? ( */}
        <div className="bg-white rounded-lg p-2 ">
          <Form
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onValidateForm={validateForm}
            inputFields={inputFields}
            errors={errors}
            toggleErrors={toggleErrors}
          />
        </div>

        <div
          className={`bg-white rounded-lg p-1 md:p-6 md:shadow-md mt-[-10px] md:mt-0`}
        >
          <ResultsPanel
            results={results}
            isLoading={isLoading}
            error={apiError}
          />
        </div>
      </div>
    </main>
  );
}
