export const getRedirectUrl = (resultCode,id,category) => {
    switch (resultCode) {
      case "Authorised":
        return `/events/status?st=success&id=${id}&cId=${category}`;
      case "Pending":
      case "Received":
        return `/events/status?st=pending&id=${id}&cId=${category}`;
      case "Refused":
        return `/events/status?st=failed`;
      default:
        return "/events/status?st=error";
    }
  }