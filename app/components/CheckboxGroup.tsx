import { Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';

interface CheckboxGroupProps {
    options: string[];
    onSelect: (selectedOptions: string[]) => void;
    style?: any;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, onSelect, style, ...otherProps}) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        onSelect(selectedOptions);
    }, [selectedOptions]);

    const handleSelect = (option: string) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((selectedOption) => selectedOption !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

    return (
        <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
        }}>
            {options.map((option) => (
                <TouchableOpacity key={option} style={[
                    {
                        backgroundColor: selectedOptions.includes(option) ? Colors.buttonDark : Colors.buttonLight,
                        borderRadius: Spacing,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing/1.5,
                        flexBasis: "30%",
                        marginVertical: Spacing/2,
                        marginHorizontal: Spacing/2,
                    },
                    style
                ]}
                {...otherProps}
                onPress={() => handleSelect(option)}
                >
                    <Text style={[
                        {
                            color: selectedOptions.includes(option) ? Colors.background : Colors.textDark,
                            fontFamily: Font["inter-regular"],
                            fontSize: FontSize.small,
                            textAlign: "center",
                        },
                    ]}>
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default CheckboxGroup;