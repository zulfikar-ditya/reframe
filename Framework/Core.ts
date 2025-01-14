import "reflect-metadata";

/**
 * Interface declaration
 */
export interface IControllerDecorator {
	prefix?: string;
	middlewares?: string[];
}

/**
 * Represents an HTTP method.
 */
export type IHttpMethod = "get" | "post" | "put" | "patch" | "delete" | "all";

/**
 * Represents a Reframe request object.
 */
export type IReframeRequest = {
	body: any;
	params: any;
	headers: any;
	url: any;
	query: any;
	auth: any;
	validate: Function;
};

/**
 * Represents a Reframe response object.
 */
type IReframeResponse = {
	json: (data: Record<string, any>) => void;
	status: (status: number) => IReframeResponse;
};

/**
 * Represents a Reframe handler function.
 */
export type IReframeHandler = {
	request: IReframeRequest;
	response: IReframeResponse;
};

/**
 * Method decorator for route-handler
 */
function HandlerDecorator({
	method,
	path = "/",
}: {
	method: IHttpMethod;
	path: string;
}): MethodDecorator {
	return (target, propertyKey, descriptor) => {
		descriptor.writable = false;

		Reflect.defineMetadata("path", path, target, propertyKey);
		Reflect.defineMetadata("method", method, target, propertyKey);
	};
}

export const Get = (path?: string): MethodDecorator =>
	HandlerDecorator({ method: "get", path });
export const Post = (path?: string): MethodDecorator =>
	HandlerDecorator({ method: "post", path });
export const Put = (path?: string): MethodDecorator =>
	HandlerDecorator({ method: "put", path });
export const Patch = (path?: string): MethodDecorator =>
	HandlerDecorator({ method: "patch", path });
export const Delete = (path?: string): MethodDecorator =>
	HandlerDecorator({ method: "delete", path });
export const All = (path?: string): MethodDecorator =>
	HandlerDecorator({ method: "all", path });

/**
 * This is a class decorator called Controller.
 * It takes an optional parameter of type IControllerDecorator.
 * It returns a ClassDecorator function that takes a target parameter.
 * If the params parameter is provided, it sets the "prefix" and "middlewares" metadata on the target using the Reflect.defineMetadata method.
 */
export function Controller(params?: IControllerDecorator): ClassDecorator {
	return (target) => {
		if (params) {
			Reflect.defineMetadata("prefix", params.prefix, target);
			Reflect.defineMetadata("middlewares", params.middlewares, target);
		}
	};
}
