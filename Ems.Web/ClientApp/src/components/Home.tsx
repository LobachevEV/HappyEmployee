import React from 'react';
import {connect} from 'react-redux';
import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  }),
);

const Home = () => (
  <div className={useStyles().root}>
    <Typography variant="h2">Hello, world!</Typography>
    <Typography variant="h5">Welcome to your new single-page application, built with:</Typography>
    <Typography variant="body1" component={"ul"}>
      <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a
        href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code
      </li>
      <li><a href='https://facebook.github.io/react/'>React</a> and <a href='https://redux.js.org/'>Redux</a> for
        client-side code
      </li>
      <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
    </Typography>
    <Typography variant={"subtitle1"}>To help you get started, we've also set up:</Typography>
    <Typography variant="body1" component={"ul"}>
      <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return
        here.
      </li>
      <li><strong>Development server integration</strong>. In development mode, the development server
        from <code>create-react-app</code> runs in the background automatically, so your client-side resources are
        dynamically built on demand and the page refreshes when you modify any file.
      </li>
      <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled,
        and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.
      </li>
    </Typography>
    <Typography variant={"body1"} component={"p"}>The <code>ClientApp</code> subdirectory is a standard React
      application based on
      the <code>create-react-app</code> template. If you open a command prompt in that directory, you can
      run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.
    </Typography>
  </div>
);

export default connect()(Home);
