// import { authenticationPages } from "@/constants";
// import { AuthPageLayout } from "@/layouts";
// import { Route } from "react-router-dom";

// export const PublicRoute = () => {
//   return (
//     <>
//       {authenticationPages.map(({ path, Element }) => (
//         <Route
//           path={path}
//           element={
//             <AuthPageLayout>
//               <Element />
//             </AuthPageLayout>
//           }
//           key={path}
//         />
//       ))}
//     </>
//   );
// };


import { authenticationPages } from "@/constants";
import { AuthPageLayout } from "@/layouts";
import { Route } from "react-router-dom";

export const PublicRoute = () => {
  return (
    <>
      {authenticationPages.map(({ path, Element, title, description }) => (
        <Route
          key={path}
          path={path}
          element={
            <AuthPageLayout title={title || ""} description={description || ""}>
              <Element />
            </AuthPageLayout>
          }
        />
      ))}
    </>
  );
};
