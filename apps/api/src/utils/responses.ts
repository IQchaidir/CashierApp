export const resSuccess = (data?: any) => {
    return { status: 200, response: data };
};

export const resCreated = (data: any) => {
    return { status: 201, response: data };
};

export const resBadRequest = (message: string) => {
    return { status: 400, response: message };
};

export const resUnauthorized = (message: string) => {
    return { status: 401, response: message };
};

export const resForbidden = (message: string) => {
    return { status: 403, response: message };
};

export const resNotFound = (message: string) => {
    return { status: 404, response: message };
};
