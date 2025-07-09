type PayloadWithFile = {
  file?: Blob;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};
export const modifyPayload = (values: PayloadWithFile) => {
  const obj = { ...values };
  const file = obj.file;
  if (file) {
    delete obj.file;
  }

  const data = JSON.stringify(obj);
  const formData = new FormData();
  if (file) {
    formData.append("file", file);
  }
  formData.append("data", data);

  return formData;
};
