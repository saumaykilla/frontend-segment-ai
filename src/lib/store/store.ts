import { create } from "zustand";

type State =
  {
    parsedData: any;
    setParsedData: (
      data: any
    ) => void;
  };

export const useExtractedDataStore =
  create<State>(
    (
      set
    ) => ({
      parsedData:
        null,
      setParsedData:
        (
          data
        ) =>
          set(
            {
              parsedData:
                data,
            }
          ),
    })
  );
