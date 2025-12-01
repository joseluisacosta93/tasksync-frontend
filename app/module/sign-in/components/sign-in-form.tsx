import { View } from "react-native";

import { MainButton } from "@/app/components/ui/buttons/main-button";
import { InvalidField } from "@/app/components/ui/input/invalid-field";
import { LabelInput } from "@/app/components/ui/label-input";
import { Write } from "@/app/components/ui/text/write";
import { useColor } from "@/theme/hooks/useColor";
import { Formik } from "formik";
import { useLogin } from "../hooks/useLogin";
import { SignInSchema } from "../validations/sign-in.schema";

export default function SignInForm() {
  const color = useColor();
  const { loginApi, isPending, error } = useLogin();
  return (
    <View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          loginApi(values);
        }}
        validationSchema={SignInSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: color.background,
            }}
          >
            <View style={{ padding: 5 }}>
              <View style={{ paddingTop: 4 }}>
                <LabelInput
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={() => {
                    handleBlur("email");
                  }}
                  value={values.email}
                  placeholder={"placeholder"}
                />
                <InvalidField message={errors.email} />
              </View>
              <View style={{ paddingTop: 4 }}>
                <LabelInput
                  placeholder="Password"
                  label="Password"
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  onBlur={() => {
                    handleBlur("password");
                  }}
                  value={values.password}
                />
                <InvalidField message={errors.password} />
              </View>
              <View style={{ paddingTop: 15 }}>
                <MainButton
                  title="Sign In"
                  onPress={handleSubmit}
                  disabled={isPending || Object.keys(errors).length > 0}
                />
              </View>
              {error && (
                <Write
                  text={"error al iniciar sesion"}
                  style={{ color: "red", textAlign: "center" }}
                ></Write>
              )}
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
