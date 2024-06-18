export function getFormData<T>(data: T){
  const formData = new FormData();
  for (let key in data) {
    // @ts-ignore
    formData.append(key, data[key]);
  }

  return formData;
}
