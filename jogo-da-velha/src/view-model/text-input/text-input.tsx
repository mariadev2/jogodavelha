import React, { ReactElement, forwardRef } from "react";
import {
    TextInput as NativeTextInput,
    TextInputProps as NativeTextInputProps,
    StyleSheet
} from "react-native";

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: "100%",
        borderBottomWidth: 1,
        borderColor: '#E78F31', 
        backgroundColor: '#fff', 
        padding: 10,
        color: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 10,
        fontFamily: 'DeliusUnicase_400Regular'
    }
});

const TextInput = forwardRef<NativeTextInput, NativeTextInputProps>(
    ({ style, ...props }: NativeTextInputProps, ref): ReactElement => {
        return (
            <NativeTextInput
                ref={ref}
                placeholderTextColor="#5d5379"
                style={[styles.input, style]}
                {...props}
            />
        );
    }
);

TextInput.displayName = "TextInput";

export default TextInput;