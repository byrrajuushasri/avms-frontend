"use client";

import { useState } from "react";
import {
  parsePhoneNumberFromString,
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

interface PhoneInputProps {
  value?: string;
  onChange: (phone: string) => void;
}

const preferredCountries: CountryCode[] = ["IN", "US", "GB", "AE", "CA", "AU"];

export default function PhoneInput({
  value = "",
  onChange,
}: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>("IN");
  const [phone, setPhone] = useState("");

  const countries = [
    ...preferredCountries,
    ...getCountries().filter(
      (item) => !preferredCountries.includes(item)
    ),
  ];

  const handlePhoneChange = (input: string) => {
    const cleaned = input.replace(/[^\d]/g, "");
    setPhone(cleaned);

    const callingCode = getCountryCallingCode(country);
    const parsed = parsePhoneNumberFromString(
      `+${callingCode}${cleaned}`
    );

    onChange(parsed?.number ?? `+${callingCode}${cleaned}`);
  };

  const handleCountryChange = (code: CountryCode) => {
    setCountry(code);

    const callingCode = getCountryCallingCode(code);
    const parsed = phone
      ? parsePhoneNumberFromString(`+${callingCode}${phone}`)
      : undefined;

    onChange(parsed?.number ?? (phone ? `+${callingCode}${phone}` : ""));
  };

  const isValid =
    phone.length > 0 &&
    !!parsePhoneNumberFromString(
      `+${getCountryCallingCode(country)}${phone}`
    )?.isValid();

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Phone Number
      </label>

      <div className="flex gap-2">
        <select
          value={country}
          onChange={(e) =>
            handleCountryChange(e.target.value as CountryCode)
          }
          className="w-36 rounded-lg border border-gray-300 bg-white px-2 py-3 text-sm"
          aria-label="Select country"
        >
          {countries.map((code) => (
            <option key={code} value={code}>
              {code} (+{getCountryCallingCode(code)})
            </option>
          ))}
        </select>

        <input
          type="tel"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="Enter phone number"
          className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-3 outline-none focus:border-blue-500"
          autoComplete="tel-national"
        />
      </div>

      {phone && (
        <p className={`mt-1 text-sm ${isValid ? "text-green-600" : "text-red-500"}`}>
          {isValid ? "Valid phone number" : "Please enter a valid phone number"}
        </p>
      )}
    </div>
  );
}