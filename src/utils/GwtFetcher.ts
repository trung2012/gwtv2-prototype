// API endpoint = https://support.microsoft.com/app/content/api/content/help/en-us/4551728

export const fetchJsonWithFetchAPI = (gwtDocumentUrl: string) => {
    fetch(gwtDocumentUrl).then(response => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    });
  };
  