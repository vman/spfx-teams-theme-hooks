import * as React from 'react';
import styles from './HelloTeams.module.scss';
import { IHelloTeamsProps } from './IHelloTeamsProps';
import { useEffect, useState } from 'react';

const HelloTeams: React.FunctionComponent<IHelloTeamsProps> = (props: IHelloTeamsProps) => {

  const [themeState, setThemeState] = useState<string>(props.teamsTheme || "default");

  const [styleState, setStyleState] = useState<string>(styles.containerdefault);

  //Run effect once when the component loads. We will use this effect to register our Theme Changed handler.
  useEffect(() => {

    console.log("registerOnThemeChangeHandler useEffect fired");
    
    props.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler((theme: string) => {
      
      console.log(`theme changed to: ${theme}`);

      //Update the themeState with the new theme.
      setThemeState(theme);
    });

  }, []);

  //Run anytime the themeState changes. 
  useEffect(() => {

    console.log("themeState useEffect fired");

    switch (themeState) {
      case "dark":
        setStyleState(styles.containerdark);
        break;
      default:
        setStyleState(styles.containerdefault);
    }

  }, [themeState]);

  return (
    <div className={styles.helloTeams}>
      <div className={`${styles.container} ${styleState}`}>
        <div className={styles.row}>
          <div className={styles.column}>
            <span className={styles.title}>Welcome to Teams in {themeState} mode!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelloTeams;
