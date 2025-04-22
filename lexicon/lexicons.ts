/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  type LexiconDoc,
  Lexicons,
  ValidationError,
  type ValidationResult,
} from "@atproto/lexicon";
import { type $Typed, is$typed, maybe$typed } from "./util";

export const schemaDict = {
  AppOchoPluginCode: {
    lexicon: 1,
    id: "app.ocho.plugin.code",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["data", "createdAt"],
          properties: {
            data: {
              type: "string",
            },
            createdAt: {
              type: "string",
              format: "datetime",
            },
          },
        },
      },
    },
  },
  AppOchoPluginService: {
    lexicon: 1,
    id: "app.ocho.plugin.service",
    defs: {
      main: {
        type: "record",
        description: "A declaration of the existence of plugin service.",
        key: "literal:self",
        record: {
          type: "object",
          required: ["createdAt"],
          properties: {
            createdAt: {
              type: "string",
              format: "datetime",
            },
          },
        },
      },
    },
  },
  AppOchoStatus: {
    lexicon: 1,
    id: "app.ocho.status",
    defs: {
      main: {
        type: "record",
        key: "tid",
        record: {
          type: "object",
          required: ["status", "createdAt"],
          properties: {
            status: {
              type: "string",
              minLength: 1,
              maxGraphemes: 128,
              maxLength: 256,
            },
            createdAt: {
              type: "string",
              format: "datetime",
            },
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>;
export const schemas = Object.values(schemaDict) satisfies LexiconDoc[];
export const lexicons: Lexicons = new Lexicons(schemas);

export function validate<T extends { $type: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType: true,
): ValidationResult<T>;
export function validate<T extends { $type?: string }>(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: false,
): ValidationResult<T>;
export function validate(
  v: unknown,
  id: string,
  hash: string,
  requiredType?: boolean,
): ValidationResult {
  return (requiredType ? is$typed : maybe$typed)(v, id, hash)
    ? lexicons.validate(`${id}#${hash}`, v)
    : {
        success: false,
        error: new ValidationError(
          `Must be an object with "${hash === "main" ? id : `${id}#${hash}`}" $type property`,
        ),
      };
}

export const ids = {
  AppOchoPluginCode: "app.ocho.plugin.code",
  AppOchoPluginService: "app.ocho.plugin.service",
  AppOchoStatus: "app.ocho.status",
} as const;
