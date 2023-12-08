import { Text, View, TouchableOpacity, TouchableOpacityProps, } from 'react-native'
import React, { Component, useState } from 'react'
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';

interface OptionButtonProps extends TouchableOpacityProps{
    style?: any;
    text: string;
}


const OptionButton: React.FC<OptionButtonProps> = ({ text, style, ...otherProps}) => {

    const [isSelected, setIsSelected] = useState(false);

    const handlePress = ( event:any ) => {
        setIsSelected(!isSelected);
        if (otherProps.onPress) {
          otherProps.onPress(event);
        }
      };



    return (
        <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            
        }}>
                <TouchableOpacity style={[
                    {
                        backgroundColor: isSelected ? Colors.buttonDark : Colors.buttonLight,
                        borderRadius: Spacing,
                        paddingVertical: Spacing,
                        paddingHorizontal: Spacing/1.5,
                        // width: "40%",
                        flexBasis: "98%",
                        marginVertical: Spacing/2,
                        marginHorizontal: Spacing/2,
                    },
                    style,
                ]}
                {...otherProps}
                onPress={handlePress}
                >
                    <Text style={[
                        {
                            color: isSelected ? Colors.background : Colors.textDark,
                            fontFamily: Font["inter-regular"],
                            fontSize: FontSize.medium,
                        },
                    ]}>
                        {text}
                    </Text>
                </TouchableOpacity>
        </View>
    );
}

export default OptionButton;