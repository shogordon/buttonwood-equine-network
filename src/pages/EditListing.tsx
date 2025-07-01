
import { useParams } from "react-router-dom";
import NewListing from "./NewListing";

const EditListing = () => {
  const { draftId } = useParams();
  
  // Simply render the NewListing component with the draftId
  // The NewListing component already handles loading drafts and published listings
  return <NewListing />;
};

export default EditListing;
