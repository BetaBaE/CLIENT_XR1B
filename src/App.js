import { Admin, CustomRoutes, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";
import { resourceConfig, customRoutesConfig } from "./resourceConfig";
import { CustomLayout } from "./components/custom/layout/CustomLayout";
import { Route } from "react-router-dom";
import { auth } from "./authProvider";
import apiUrl from "./config";
import Login from "./components/Login/login";
import React from "react";
import { can } from "./utils/rbac";

const fetchJson = async (url, options = {}) => {
  const requestHeaders =
    options.headers ||
    new Headers({
      Accept: "application/json",
    });
  if (
    !requestHeaders.has("Content-Type") &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...options, headers: requestHeaders });
  const text = await response.text();
  const o = {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    body: text,
  };
  let status = o.status,
    // statusText = o.statusText,
    headers = o.headers,
    body = o.body;
  let json;
  try {
    json = JSON.parse(body);
  } catch (e) {
    // not json, no big deal
  }
  if (status < 200 || status >= 300) {
    return Promise.reject(body);
  }
  return Promise.resolve({
    status: status,
    headers: headers,
    body: body,
    json: json,
  });
};
function App(props) {
  const dataProvider = restProvider(apiUrl, fetchJson);
  return (
    <Admin
      {...props}
      dataProvider={dataProvider}
      authProvider={auth}
      loginPage={Login}
      // dashboard={Dashboard}
      layout={CustomLayout}
    >
      {(permissions) => {
        const buildResource = (cfg) => {
          const create =
            typeof cfg.create === "undefined"
              ? undefined
              : cfg.create === null
              ? null
              : can(permissions, cfg.createRoles || [])
              ? cfg.create
              : null;
          const edit =
            typeof cfg.edit === "undefined"
              ? undefined
              : cfg.edit === null
              ? null
              : can(permissions, cfg.editRoles || [])
              ? cfg.edit
              : null;

          return (
            <Resource
              key={cfg.name}
              name={cfg.name}
              list={cfg.list}
              create={create}
              edit={edit}
              icon={cfg.icon}
            />
          );
        };

        const renderedResources = resourceConfig
          .filter((cfg) => can(permissions, cfg.viewRoles))
          .map(buildResource);

        // Dynamically render custom routes from config
        const renderedCustomRoutes = customRoutesConfig
          .filter((route) => can(permissions, route.requiredRoles))
          .map((route, idx) => (
            <CustomRoutes key={route.path || idx}>
              <Route
                path={route.path}
                element={React.createElement(route.element)}
              />
            </CustomRoutes>
          ));

        return [...renderedResources, ...renderedCustomRoutes];
      }}
    </Admin>
  );
}

export default App;
