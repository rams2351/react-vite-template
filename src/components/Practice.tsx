import { FaIcon, IoIcon, MdIcon } from "@/assets/icons";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Dialog from "@/components/common/Dialog";
import Drawer from "@/components/common/Drawer";
import MultiSelect, { type MultiSelectRef } from "@/components/common/MultiSelect";
import Select from "@/components/common/Select";
import Tabs from "@/components/common/Tabs";
import TextInput from "@/components/common/TextInput";
import { actions } from "@/redux/slices/reducer";
import NavigationService from "@/services/NavigationService";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().nonempty({ message: "Email is required!" }).email("Please enter a valid email address"),

  selection: z.enum(["hello", "hello1"]).refine((val) => !!val, { message: "Please select a valid option" }),

  multiSelection: z.array(z.enum(["hello", "hello1"])).min(1, { message: "Please select at least one option" }),
});

type FormValues = z.infer<typeof formSchema>;

const Practice: React.FC = () => {
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["react", "angular"]);
  const [activeTab, setActiveTab] = useState<string>("input");
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // const updateLang = useUpdateLanguage();

  const MultiSelectRef = useRef<MultiSelectRef>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      selection: undefined,
      multiSelection: [],
    },
  });

  const dispatch = useDispatch();

  const onLogin = () => {
    dispatch(actions.doLogin());
  };

  return (
    <div className="p-20 space-y-4 flex flex-col w-full">
      Welcome
      <div className="card p-0 space-y-7 overflow-auto">
        <Tabs
          tabs={[
            { label: "Language", value: "language", icon: <FaIcon.FaLanguage /> },
            { label: "Login", value: "auth", icon: <FaIcon.FaLock /> },
            { label: "Buttons", value: "button", icon: <IoIcon.IoIosAirplane /> },
            { label: "Inputs", value: "input", icon: <IoIcon.IoIosAlarm /> },
            { label: "Extra", value: "extra", icon: <IoIcon.IoIosAmericanFootball /> },
          ]}
          activeTab={activeTab}
          onChangeTab={(val) => setActiveTab(val)}
          tabItemClassName="min-w-[200px]"
          containerClassName="border-border"
          activeTabClassName="border-primary text-primary"
        />

        {activeTab == "auth" && (
          <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
            style={{
              backgroundImage: `url('/images/auth-illustration.avif')`,
            }}
          >
            {
              <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden text-black">
                {/* Left Side */}

                <div className="">
                  <Button onClick={() => NavigationService.navigate("/register", { otp: 123456 })}>Register</Button>
                  <Button onClick={onLogin}>Login</Button>
                </div>
                {/* Right Side */}
                <div className="p-8">HEllo</div>
              </div>
            }
          </div>
        )}

        {activeTab == "button" && (
          <div className=" p-5 space-y-7">
            <p className="font-bold ">Buttons</p>
            <div className="space-x-5">
              <Button size="sm"> Create Exam</Button>
              <Button size="lg"> Create Exam</Button>
              <Button size="default"> Create Exam</Button>
            </div>

            <div className="space-x-5">
              <Button variant="outline" size="sm">
                {" "}
                Create Exam
              </Button>
              <Button variant="outline" size="lg">
                {" "}
                Create Exam
              </Button>
              <Button variant="outline" size="default">
                {" "}
                Create Exam
              </Button>
            </div>

            <div className="space-x-5">
              <Button variant="destructive" size="sm">
                {" "}
                Create Exam
              </Button>
              <Button variant="destructive" size="lg">
                {" "}
                Create Exam
              </Button>
              <Button variant="destructive" size="default">
                {" "}
                Create Exam
              </Button>
            </div>
          </div>
        )}

        {activeTab == "input" && (
          <div className="p-5">
            <p className="font-bold ">Form inputs</p>

            <div className="mt-10">
              <div className=" max-w-xl">
                <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>

                <MultiSelect
                  ref={MultiSelectRef}
                  label="Select"
                  value={selectedFrameworks}
                  onChange={setSelectedFrameworks}
                  required
                  options={[
                    // { label: "", value: "" },
                    { label: "Hello", value: "hello" },
                    { label: "Hello1", value: "hello1" },
                  ]}
                  placeholder="Select categories..."
                  maxDisplay={1}
                  showBadges
                  containerClassName="w-full"
                  prefixIcon={<IoIcon.IoIosHome className="text-foreground" />}
                />

                <Select
                  name="selection"
                  label="Select"
                  containerClassName="mt-5"
                  className="w-full"
                  required
                  onChange={(e) => console.log("first", e)}
                  placeholder="Select an option"
                  prefixIcon={<IoIcon.IoIosHome className="text-foreground" />}
                  options={[
                    { label: "Hello", value: "hello" },
                    { label: "Hello1", value: "hello1" },
                  ]}
                ></Select>
              </div>
            </div>

            <FormProvider {...form}>
              <TextInput
                name="email"
                required
                placeholder="Email address...."
                label="Email"
                control={form.control}
                startIcon={<MdIcon.MdAdd />}
                endIcon={<MdIcon.MdAdd />}
              />

              <MultiSelect
                ref={MultiSelectRef}
                control={form.control}
                label="Select"
                required
                name="multiSelection"
                options={[
                  { label: "Hello", value: "hello" },
                  { label: "Hello1", value: "hello1" },
                ]}
                placeholder="Select categories..."
                maxDisplay={1}
                showBadges={false}
                containerClassName="w-full"
                prefixIcon={<IoIcon.IoIosHome className="text-foreground" />}
                footer={
                  <p
                    onClick={() => {
                      MultiSelectRef.current?.close();
                      console.log("MultiSelectRef.current?.close()", MultiSelectRef.current);
                    }}
                  >
                    hello
                  </p>
                }
              />

              <Select
                name="selection"
                control={form.control}
                label="Select"
                containerClassName="mt-5"
                className="w-full"
                required
                placeholder="Select an option"
                prefixIcon={<IoIcon.IoIosHome className="text-foreground" />}
                options={[
                  { label: "Hello", value: "hello" },
                  { label: "Hello1", value: "hello1" },
                ]}
              ></Select>

              <Button className="w-full my-5" onClick={form.handleSubmit((data) => console.log("DATA", data))}>
                Submit
              </Button>
            </FormProvider>

            <div className="">
              <Checkbox label="Select is the new process" className="mt-5" />
            </div>
          </div>
        )}

        {activeTab == "extra" && (
          <div className="p-5 space-x-2">
            <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>
            <Button onClick={() => setOpenDialog(true)}>Open Dialog</Button>

            <Drawer onClose={() => setOpenDrawer(false)} open={openDrawer} className="bg-white min-w-[500px]" title="helllo">
              <div className="bg-destructive">hello</div>

              <div className="h-96"></div>
              {/* <div className="h-screen bg-destructive">helll it is drawer</div> */}
            </Drawer>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} className="p-10">
              <div className="bg-destructive p-10">hello</div>

              {/* <div className="h-96"></div> */}
            </Dialog>
          </div>
        )}

        {activeTab == "theme" && <Button className=" ">Welcome</Button>}
      </div>
    </div>
  );
};

export default Practice;
