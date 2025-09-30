import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";

function FormControls({ formControls = [], formData, setFormData }) {
  const formItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  function renderComponentByType(getControlItem) {
    let element = null;
    const currentControlItemValue = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="border-purple-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [getControlItem.name]: value,
              })
            }
            value={currentControlItemValue}
          >
            <SelectTrigger className="w-full border-purple-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent className="border-purple-100 shadow-md animate-in">
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItem) => (
                    <SelectItem 
                      key={optionItem.id} 
                      value={optionItem.id}
                      className="hover:bg-indigo-50 focus:bg-indigo-50 transition-colors duration-200"
                    >
                      {optionItem.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="border-purple-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300 min-h-[120px]"
          />
        );
        break;

      default:
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemValue}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
            className="border-purple-100 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
          />
        );
        break;
    }

    return element;
  }

  return (
    <div className="flex flex-col gap-4">
      {formControls.map((controlItem, index) => (
        <motion.div 
          key={controlItem.name}
          variants={formItemVariants}
          className="space-y-2"
        >
          <Label 
            htmlFor={controlItem.name}
            className="text-gray-700 font-medium"
          >
            {controlItem.label}
          </Label>
          {renderComponentByType(controlItem)}
        </motion.div>
      ))}
    </div>
  );
}

export default FormControls;
