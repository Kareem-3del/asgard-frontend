import React, {useCallback} from "react";
import Particles from "react-tsparticles";
import ParticlesConfig from "./ParticlesConfig";
import {Container, Engine} from "tsparticles-engine";

export default function ParticlesEffect() {
    const initParticles = useCallback(
        async (engin: Engine) => {
            console.log(engin);
            engin.init();
        },
        [],
    );

    return (<div>
            <Particles id="particles" options={ParticlesConfig} />
        </div>
    );
}
