import React, { useState } from "react";
import { ProspectInfo } from "@/types";

import { UserCheck, AlertCircle } from "lucide-react";

interface BackgroundCheckFormProps {
  onSubmit: (info: ProspectInfo) => void;
  isLoading: boolean;
  onValidateForm: (formData: ProspectInfo) => boolean;
  inputFields: ProspectInfo;
  errors: Partial<Record<keyof ProspectInfo, string>>;
  toggleErrors: (name: string) => void;
}

export const Form: React.FC<BackgroundCheckFormProps> = ({
  onSubmit,
  isLoading,
  onValidateForm,
  inputFields,
  errors,
  toggleErrors,
}) => {
  const [formData, setFormData] = useState<ProspectInfo>({ ...inputFields });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const name = target.name;

    // If it's a checkbox, target is HTMLInputElement & has `.checked`
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      // Otherwise it's a text input or select, so use `value`
      setFormData((prev) => ({
        ...prev,
        [name]: target.value,
      }));
    }

    // Clear error when field is updated

    if (errors[name as keyof ProspectInfo]) {
      toggleErrors(name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onValidateForm(formData)) {
      onSubmit(formData);
    }
  };
  //"w-full overflow-scroll  max-h-[350px] md:max-h-full"
  return (
    <div className="">
      <div className="md:flex hidden items-center mb-6">
        <UserCheck className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          AI Background Check
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 px-2.5">
        <div className="grid grid-cols-1  gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.lastName}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1  gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Most widely used email "
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.city}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Province/State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.state ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.state && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.state}
              </p>
            )}
          </div>
        </div>
        <fieldset className="mb-6">
          <legend className="block text-sm font-medium text-gray-700 mb-2">
            Have you lived in the above location for more than 2 years?
          </legend>
          <div className="flex space-x-6">
            {/* Yes Option */}
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="lengthOfStay"
                value="yes"
                checked={formData.lengthOfStay === "yes"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Yes</span>
            </label>

            {/* No Option */}
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="lengthOfStay"
                value="no"
                checked={formData.lengthOfStay === "no"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">No</span>
            </label>
          </div>
        </fieldset>

        {formData.lengthOfStay === "no" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="city2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city2"
                name="city2"
                value={formData.city2}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.city2 && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.city2}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Province/State
              </label>
              <input
                type="text"
                id="state2"
                name="state2"
                value={formData.state2}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors.state2 ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.state2 && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.state2}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="flex items-start flex-col space-x-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="truthCheck"
              checked={formData.truthCheck}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700 block  font-medium">
              I confirm every information entered above is true
            </span>
          </label>
          {errors.truthCheck && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.truthCheck}
            </p>
          )}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Running Check...
              </span>
            ) : (
              "Run Background Check"
            )}
          </button>
          <div className="flex items-start justify-center !gap-0 text-center text-sm text-gray-500 mt-3 ">
            <span className="md:hidden">
              You agree to Rented123 using AI to run a background check on you.{" "}
              <a
                href="https://rented123.com/"
                className="underline"
                target="_blank"
              >
                Privacy policy
              </a>
            </span>
            <span className="hidden md:block text-xs">
              By proceeding you agree to Rented123 using AI to run a background
              check on you. Your personal information will not be stored
              anywhere. For more information, see our{" "}
              <a
                href="https://rented123.com/"
                className="underline"
                target="_blank"
              >
                privacy policy
              </a>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
