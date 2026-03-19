import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Country } from "../types/Country";

interface CountryProps {
  country: Country;
}

export default function RootLayout({ country }: CountryProps) {
  return (
    <>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="country/[code]"
          options={{
            title: country?.name.common ?? "Country",
            headerBackTitle: "back",
            headerTransparent: true,
          }}
        />
      </Stack>
    </>
  );
}
