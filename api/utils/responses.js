export const ok = (res, data) => res.status(200).json({ data });
export const created = (res, message) => res.status(201).json({ message });
export const badRequest = (res, message) => res.status(400).json({ message });
export const notFound = (res, message) => res.status(404).json({ message });
export const conflict = (res, message) => res.status(409).json({ message });
export const serverError = (res, message) => res.status(500).json({ message });
export const unauthorized = (res, message) => res.status(401).json({ message });
