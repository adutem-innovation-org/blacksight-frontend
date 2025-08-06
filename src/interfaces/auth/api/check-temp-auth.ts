import { MFAMethods } from "@/enums";

export type CheckTempAuthRes = {
  valid: boolean;
  expiresAt: number;
  timeRemaining: number;
  availableMethods: {
    methods: MFAMethods;
    mfaEnabled: boolean;
  };
};
