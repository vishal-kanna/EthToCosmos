// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: arka/nft/v1beta1/nft.proto

/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "arka.nft.v1beta1";

export enum ClassType {
  /** CLASS_TYPE_UNSPECIFIED - UNSPECIFIED defines an invalid framework option. */
  CLASS_TYPE_UNSPECIFIED = 0,
  /** CLASS_TYPE_AGENT - CLASSTYPE_AGENT defines AI agents class type. */
  CLASS_TYPE_AGENT = 1,
  /** CLASS_TYPE_PREDICTION - CLASSTYPE_PREDICTION defines agent results. */
  CLASS_TYPE_PREDICTION = 2,
  UNRECOGNIZED = -1,
}

export function classTypeFromJSON(object: any): ClassType {
  switch (object) {
    case 0:
    case "CLASS_TYPE_UNSPECIFIED":
      return ClassType.CLASS_TYPE_UNSPECIFIED;
    case 1:
    case "CLASS_TYPE_AGENT":
      return ClassType.CLASS_TYPE_AGENT;
    case 2:
    case "CLASS_TYPE_PREDICTION":
      return ClassType.CLASS_TYPE_PREDICTION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClassType.UNRECOGNIZED;
  }
}

export function classTypeToJSON(object: ClassType): string {
  switch (object) {
    case ClassType.CLASS_TYPE_UNSPECIFIED:
      return "CLASS_TYPE_UNSPECIFIED";
    case ClassType.CLASS_TYPE_AGENT:
      return "CLASS_TYPE_AGENT";
    case ClassType.CLASS_TYPE_PREDICTION:
      return "CLASS_TYPE_PREDICTION";
    case ClassType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * RoyaltyInfo represents a struct that describes
 * a NFT royalty information.
 */
export interface RoyaltyInfo {
  /** payment_address is the account address which receives NFT royalty */
  paymentAddress: string;
  /** share is the percentage of ownership transfer shares */
  share: Coin | undefined;
}

/**
 * ClassMetadata represents a struct that describes
 * NFT class metadata.
 */
export interface ClassMetadata {
  metadata: string;
  classType: ClassType;
}

/**
 * NFTMetadata represents a struct that describes
 * a NFT metadata.
 */
export interface NFTMetadata {
  royaltyInfo:
    | RoyaltyInfo
    | undefined;
  /** agent_id defines AI agent id */
  agentId: number;
}

/** ClassOwner represents the owners of the nft class */
export interface ClassOwner {
  classId: string;
  owners: string[];
}

/** AnyData represents the metadata of nft */
export interface AnyData {
  data: string;
}

function createBaseRoyaltyInfo(): RoyaltyInfo {
  return { paymentAddress: "", share: undefined };
}

export const RoyaltyInfo = {
  encode(message: RoyaltyInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.paymentAddress !== "") {
      writer.uint32(10).string(message.paymentAddress);
    }
    if (message.share !== undefined) {
      Coin.encode(message.share, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RoyaltyInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRoyaltyInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.paymentAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.share = Coin.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RoyaltyInfo {
    return {
      paymentAddress: isSet(object.paymentAddress) ? globalThis.String(object.paymentAddress) : "",
      share: isSet(object.share) ? Coin.fromJSON(object.share) : undefined,
    };
  },

  toJSON(message: RoyaltyInfo): unknown {
    const obj: any = {};
    if (message.paymentAddress !== "") {
      obj.paymentAddress = message.paymentAddress;
    }
    if (message.share !== undefined) {
      obj.share = Coin.toJSON(message.share);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<RoyaltyInfo>, I>>(base?: I): RoyaltyInfo {
    return RoyaltyInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<RoyaltyInfo>, I>>(object: I): RoyaltyInfo {
    const message = createBaseRoyaltyInfo();
    message.paymentAddress = object.paymentAddress ?? "";
    message.share = (object.share !== undefined && object.share !== null) ? Coin.fromPartial(object.share) : undefined;
    return message;
  },
};

function createBaseClassMetadata(): ClassMetadata {
  return { metadata: "", classType: 0 };
}

export const ClassMetadata = {
  encode(message: ClassMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.metadata !== "") {
      writer.uint32(10).string(message.metadata);
    }
    if (message.classType !== 0) {
      writer.uint32(16).int32(message.classType);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.classType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassMetadata {
    return {
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      classType: isSet(object.classType) ? classTypeFromJSON(object.classType) : 0,
    };
  },

  toJSON(message: ClassMetadata): unknown {
    const obj: any = {};
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.classType !== 0) {
      obj.classType = classTypeToJSON(message.classType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClassMetadata>, I>>(base?: I): ClassMetadata {
    return ClassMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClassMetadata>, I>>(object: I): ClassMetadata {
    const message = createBaseClassMetadata();
    message.metadata = object.metadata ?? "";
    message.classType = object.classType ?? 0;
    return message;
  },
};

function createBaseNFTMetadata(): NFTMetadata {
  return { royaltyInfo: undefined, agentId: 0 };
}

export const NFTMetadata = {
  encode(message: NFTMetadata, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.royaltyInfo !== undefined) {
      RoyaltyInfo.encode(message.royaltyInfo, writer.uint32(10).fork()).ldelim();
    }
    if (message.agentId !== 0) {
      writer.uint32(16).uint64(message.agentId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NFTMetadata {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNFTMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.royaltyInfo = RoyaltyInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.agentId = longToNumber(reader.uint64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NFTMetadata {
    return {
      royaltyInfo: isSet(object.royaltyInfo) ? RoyaltyInfo.fromJSON(object.royaltyInfo) : undefined,
      agentId: isSet(object.agentId) ? globalThis.Number(object.agentId) : 0,
    };
  },

  toJSON(message: NFTMetadata): unknown {
    const obj: any = {};
    if (message.royaltyInfo !== undefined) {
      obj.royaltyInfo = RoyaltyInfo.toJSON(message.royaltyInfo);
    }
    if (message.agentId !== 0) {
      obj.agentId = Math.round(message.agentId);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NFTMetadata>, I>>(base?: I): NFTMetadata {
    return NFTMetadata.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NFTMetadata>, I>>(object: I): NFTMetadata {
    const message = createBaseNFTMetadata();
    message.royaltyInfo = (object.royaltyInfo !== undefined && object.royaltyInfo !== null)
      ? RoyaltyInfo.fromPartial(object.royaltyInfo)
      : undefined;
    message.agentId = object.agentId ?? 0;
    return message;
  },
};

function createBaseClassOwner(): ClassOwner {
  return { classId: "", owners: [] };
}

export const ClassOwner = {
  encode(message: ClassOwner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    for (const v of message.owners) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassOwner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owners.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassOwner {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      owners: globalThis.Array.isArray(object?.owners) ? object.owners.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: ClassOwner): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.owners?.length) {
      obj.owners = message.owners;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClassOwner>, I>>(base?: I): ClassOwner {
    return ClassOwner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClassOwner>, I>>(object: I): ClassOwner {
    const message = createBaseClassOwner();
    message.classId = object.classId ?? "";
    message.owners = object.owners?.map((e) => e) || [];
    return message;
  },
};

function createBaseAnyData(): AnyData {
  return { data: "" };
}

export const AnyData = {
  encode(message: AnyData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data !== "") {
      writer.uint32(10).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): AnyData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAnyData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): AnyData {
    return { data: isSet(object.data) ? globalThis.String(object.data) : "" };
  },

  toJSON(message: AnyData): unknown {
    const obj: any = {};
    if (message.data !== "") {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<AnyData>, I>>(base?: I): AnyData {
    return AnyData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<AnyData>, I>>(object: I): AnyData {
    const message = createBaseAnyData();
    message.data = object.data ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (long.lt(globalThis.Number.MIN_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
