import { Text, View, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';

interface RadioButtonGroupProps {
    options: string[];
    onSelect: (selectedOption: string) => void;
    style?: any;
}


const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ options, onSelect, style, ...otherProps}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
    };

    return (
        <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            
        }}>
            {options.map((option) => (
                <TouchableOpacity key={option} style={[
                    {
                        backgroundColor: Colors.buttonLight,
                        borderRadius: Spacing,
                        padding: Spacing,
                        width: "40%",
                        flexBasis: "45%",
                        marginVertical: Spacing/2,
                        marginHorizontal: Spacing/2,
                    },
                    style,
                    selectedOption === option && {backgroundColor: Colors.buttonDark}
                ]}
                {...otherProps}
                onPress={() => handleSelect(option)}
                >
                    <Text style={[
                        {
                            color: selectedOption === option ? Colors.background : Colors.textDark,
                            fontFamily: Font["inter-regular"],
                            fontSize: FontSize.medium,
                            // textAlign: "center",
                        },
                    ]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default RadioButtonGroup