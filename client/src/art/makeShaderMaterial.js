export default (c1,c2) => {

    let uniforms = {
        colorB: {type: 'vec3', value: new THREE.Color(c1)},
        colorA: {type: 'vec3', value: new THREE.Color(c2)}
    }

    let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: fragmentShader(),
        vertexShader: vertexShader(),
    })

    return material;
}

function vertexShader() {
    return `
    varying vec3 vUv;
    
    void main() {
        vUv = position;

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
    }
    `
}

function fragmentShader() {
    return `
    uniform vec3 colorA;
    uniform vec3 colorB;
    varying vec3 vUv;

    void main() {
        gl_FragColor = vec4(mix(colorA, colorB, vUv.z), 1.0);
    }
    `
}