interface ProgressBarProps {
  progress: number;
}

const ProgressBar = (props: ProgressBarProps) => {
  return (
    <div
      role="progressbar"
      aria-label="Progresso de hábitos completados nesse dia"
      aria-valuenow={props.progress}
      className="h-3 rounded-xl bg-violet-600"
      style={{ width: `${props.progress}%` }}
    />
  );
};

export default ProgressBar;
