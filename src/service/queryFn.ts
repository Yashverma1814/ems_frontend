import enqInstance from "./instance";
    
export const fetchEnquiryDetail = async (id: any) => {
    const response = await enqInstance.get(`/enquiries/${id}`);
    return response.data;
  };

  