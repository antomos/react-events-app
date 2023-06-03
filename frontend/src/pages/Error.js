import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
function ErrorPage() {
  const error  = useRouteError();

  let title = "An Error Occurred";
  let message = "Sorry, something went wrong.";
  if (error.status === 404) {
    title = "Page Not Found";
    message = "Sorry, the page you are looking for could not be found.";
  }
  if (error.status=== 500){
    message = error.data.message;
  }
  return (
    <>
    <MainNavigation />
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>

  );
}

export default ErrorPage;
