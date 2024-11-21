export type EnquiryFormData = {
    studentName: string;
    guardianName: string;
    relation: string;
    dateOfBirth: string;
    grade: string;
    currentSchool: string;
    contactDetails: {
      contactMain: string;
      contactOpt: string;
      email: string;
      socialMediaHandles: { twitter: string };
    };
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    enquirySource: string;
    description: string;
    wantHostelInfo: "";
    wantTransportInfo: "";
  };

  