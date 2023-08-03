interface IProps {
  onChange?: () => void;
  value: any;
  placeholder?: string;
  id?: string;
  classCSS?: string;
  checked?: boolean;
  classLabel?: string;
  title?: string;
}

export const InputCheck: React.FC<IProps> = ({
  value,
  onChange,
  id,
  classLabel = '',
  title = '',
}) => {
  return (
    <div>
      <div className="relative flex justify-start items-center  ">
        <input type="checkbox" checked={value} onChange={onChange} id={id} />
        <label htmlFor={id} className={classLabel}>
          {title}
        </label>
      </div>
    </div>
  );
};
