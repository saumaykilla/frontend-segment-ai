"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormSetValue } from "react-hook-form";

export function SearchableMatchSelect({
  requestItem,
  idx,
  setValue,
}: {
  requestItem: string;
  idx: number;
  setValue: UseFormSetValue<{
    rows: {
      [
        key: string
      ]: any;
    }[];
  }>;
}) {
  const supabase =
    createClient();
  const [
    open,
    setOpen,
  ] =
    useState(
      false
    );
  const [
    input,
    setInput,
  ] =
    useState(
      ""
    );
  const [
    options,
    setOptions,
  ] =
    useState<
      string[]
    >(
      []
    );
  const [
    selected,
    setSelected,
  ] =
    useState(
      requestItem
    );
  const [
    loading,
    setLoading,
  ] =
    useState(
      false
    );
  const abortRef =
    useRef<AbortController | null>(
      null
    );

  const fetchMatches =
    async (
      searchTerm: string
    ) => {
      setLoading(
        true
      );

      if (
        abortRef.current
      ) {
        abortRef.current.abort();
      }

      const controller =
        new AbortController();
      abortRef.current =
        controller;

      // Clean input — remove non-alphanum (keep numbers, slashes, quotes), split by space
      const words =
        (
          searchTerm ||
          requestItem
        )
          .toLowerCase()
          .replace(
            /[^\w\s\/"-]/g,
            ""
          )
          .split(
            " "
          )
          .filter(
            Boolean
          );

      // Build query like: name ILIKE '%word1%' AND name ILIKE '%word2%'...
      let query =
        supabase
          .from(
            "productCatalog"
          )
          .select(
            "Description"
          )
          .limit(
            5
          );

      words.forEach(
        (
          word
        ) => {
          query =
            query.ilike(
              "Description",
              `%${word}%`
            );
        }
      );

      const {
        data,
        error,
      } =
        await query.abortSignal(
          controller.signal
        );

      if (
        !error &&
        !controller
          .signal
          .aborted
      ) {
        setOptions(
          data.map(
            (
              d
            ) =>
              d.Description
          )
        );
      }

      setLoading(
        false
      );
    };

  // Fetch default matches when dropdown opens
  useEffect(() => {
    if (
      open
    ) {
      setInput(
        ""
      ); // Clear search input on open
      fetchMatches(
        ""
      ); // Load matches for the requestItem
    }
  }, [
    open,
  ]);

  // Debounced search on user input
  useEffect(() => {
    if (
      !open ||
      input ===
        ""
    )
      return;

    const timeout =
      setTimeout(
        () => {
          fetchMatches(
            input
          );
        },
        300
      );

    return () => {
      clearTimeout(
        timeout
      );
      if (
        abortRef.current
      )
        abortRef.current.abort();
    };
  }, [
    input,
  ]);

  return (
    <Popover
      open={
        open
      }
      onOpenChange={
        setOpen
      }
    >
      <PopoverTrigger
        asChild
        className="w-full"
      >
        <button
          className={cn(
            "w-full border rounded p-2 text-left",
            !selected &&
              "text-muted-foreground"
          )}
        >
          {selected ||
            "Select product"}
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full p-0"
      >
        <Command
          shouldFilter={
            false
          }
        >
          <CommandInput
            placeholder="Search products..."
            value={
              input
            }
            onValueChange={
              setInput
            }
          />
          <CommandList>
            {loading ? (
              <CommandEmpty>
                Loading...
              </CommandEmpty>
            ) : options.length ===
              0 ? (
              <CommandEmpty>
                No
                matches
                found.
              </CommandEmpty>
            ) : (
              options.map(
                (
                  option,
                  i
                ) => (
                  <CommandItem
                    key={
                      i
                    }
                    value={
                      option
                    }
                    onSelect={() => {
                      setSelected(
                        option
                      );
                      setValue(
                        `rows.${idx}.${`Request Item`}`,
                        option
                      );
                      setOpen(
                        false
                      );
                    }}
                  >
                    {
                      option
                    }
                  </CommandItem>
                )
              )
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
