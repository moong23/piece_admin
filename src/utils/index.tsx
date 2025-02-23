export const formatContact = (contact: string) => {
  if (!contact) {
    return null;
  }
  return contact.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

export const formatDate = (date: string) => {
  if (!date) {
    return null;
  }
  return date.replace(/(\d{4})-(\d{2})-(\d{2})/, "$1.$2.$3");
};
