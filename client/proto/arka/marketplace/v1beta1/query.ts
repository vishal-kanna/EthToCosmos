// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.178.0
//   protoc               unknown
// source: arka/marketplace/v1beta1/query.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { List } from "./marketplace";

export const protobufPackage = "arka.marketplace.v1beta1";

/** QuerylistsRequest is the request type for the Query/lists RPC method. */
export interface QueryListsRequest {
  /** pagination defines an pagination for the request. */
  pagination: PageRequest | undefined;
}

/** QuerylistsResponse is the response type for the Query/list RPC method. */
export interface QueryListsResponse {
  /** list defines list of list of nfts */
  list: List[];
  /** pagination defines an pagination for the response. */
  pagination: PageResponse | undefined;
}

/** QueryListByIDRequest is the request type for the Query/List RPC method. */
export interface QueryListByIDRequest {
  /** class_id defines unique id of class. */
  classId: string;
  /** nft_id defines unique id of nft. */
  nftId: string;
}

/** QueryListByIDResponse is the response type for the Query/ListByID RPC method. */
export interface QueryListByIDResponse {
  /** list defines list of organizations */
  list: List | undefined;
}

function createBaseQueryListsRequest(): QueryListsRequest {
  return { pagination: undefined };
}

export const QueryListsRequest = {
  encode(message: QueryListsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryListsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryListsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryListsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryListsRequest>, I>>(base?: I): QueryListsRequest {
    return QueryListsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryListsRequest>, I>>(object: I): QueryListsRequest {
    const message = createBaseQueryListsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryListsResponse(): QueryListsResponse {
  return { list: [], pagination: undefined };
}

export const QueryListsResponse = {
  encode(message: QueryListsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.list) {
      List.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryListsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.list.push(List.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryListsResponse {
    return {
      list: globalThis.Array.isArray(object?.list) ? object.list.map((e: any) => List.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryListsResponse): unknown {
    const obj: any = {};
    if (message.list?.length) {
      obj.list = message.list.map((e) => List.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryListsResponse>, I>>(base?: I): QueryListsResponse {
    return QueryListsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryListsResponse>, I>>(object: I): QueryListsResponse {
    const message = createBaseQueryListsResponse();
    message.list = object.list?.map((e) => List.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryListByIDRequest(): QueryListByIDRequest {
  return { classId: "", nftId: "" };
}

export const QueryListByIDRequest = {
  encode(message: QueryListByIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryListByIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListByIDRequest();
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

          message.nftId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryListByIDRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
    };
  },

  toJSON(message: QueryListByIDRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryListByIDRequest>, I>>(base?: I): QueryListByIDRequest {
    return QueryListByIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryListByIDRequest>, I>>(object: I): QueryListByIDRequest {
    const message = createBaseQueryListByIDRequest();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    return message;
  },
};

function createBaseQueryListByIDResponse(): QueryListByIDResponse {
  return { list: undefined };
}

export const QueryListByIDResponse = {
  encode(message: QueryListByIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.list !== undefined) {
      List.encode(message.list, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryListByIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryListByIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.list = List.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryListByIDResponse {
    return { list: isSet(object.list) ? List.fromJSON(object.list) : undefined };
  },

  toJSON(message: QueryListByIDResponse): unknown {
    const obj: any = {};
    if (message.list !== undefined) {
      obj.list = List.toJSON(message.list);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryListByIDResponse>, I>>(base?: I): QueryListByIDResponse {
    return QueryListByIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryListByIDResponse>, I>>(object: I): QueryListByIDResponse {
    const message = createBaseQueryListByIDResponse();
    message.list = (object.list !== undefined && object.list !== null) ? List.fromPartial(object.list) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Returns lists of nfts and agents. */
  Lists(request: QueryListsRequest): Promise<QueryListsResponse>;
  /** Returns list of nft or agent using class_id and nft_id. */
  ListByID(request: QueryListByIDRequest): Promise<QueryListByIDResponse>;
}

export const QueryServiceName = "arka.marketplace.v1beta1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Lists = this.Lists.bind(this);
    this.ListByID = this.ListByID.bind(this);
  }
  Lists(request: QueryListsRequest): Promise<QueryListsResponse> {
    const data = QueryListsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Lists", data);
    return promise.then((data) => QueryListsResponse.decode(_m0.Reader.create(data)));
  }

  ListByID(request: QueryListByIDRequest): Promise<QueryListByIDResponse> {
    const data = QueryListByIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ListByID", data);
    return promise.then((data) => QueryListByIDResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
