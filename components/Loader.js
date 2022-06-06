import { useProgress, Html } from "@react-three/drei";
export default function Loader() {
    const progress = useProgress(state => state.progress)
    if (progress !== 100) {
      return (
        <Html center wrapperClass="loader-div">
          {progress.toFixed()}% loaded
        </Html>
      );
    }
  
    return null
  }