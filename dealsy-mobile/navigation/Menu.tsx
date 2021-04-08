import React from "react";
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme, Button } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";

import { Icon, Drawer as DrawerCustomItem } from '../components/';
import Images from '../constants/Images';
import materialTheme from '../constants/Colors';
import { ListAccordionGroupContext } from "react-native-paper/lib/typescript/components/List/ListAccordionGroup";

import { logOut } from '../services/firebaseauthservice';


function CustomDrawerContent({
    drawerPosition,
    navigation,
    profile,
    focused,
    state,
    ...rest
}) {
    const insets = useSafeArea();
    const screens = [
        "Deals",
        // "Profile",
    ];
    const handlePress = async () => {
        try {
            await logOut();
            navigation.replace('Home');
        } catch (err) {
            setError(err.toString());
        }
    };
    return (
        <Block
            style={styles.container}
            forceInset={{ top: "always", horizontal: "never" }}
        >
            <Block flex={0.25} style={styles.header}>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate("Deals")}
                >
                    <Block style={styles.profile}>
                        <Image source={{ uri: profile.avatar }} style={styles.avatar} />
                        <Text h5 color={"white"}>
                            {profile.name}
                        </Text>
                    </Block>
                </TouchableWithoutFeedback>
                <Block row>
                    <Text size={16} muted style={styles.seller}>
                        {profile.type}
                    </Text>
                </Block>
            </Block>
            <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
                <ScrollView
                    contentContainerStyle={[
                        {
                            paddingTop: insets.top * 0.4,
                            paddingLeft: drawerPosition === "left" ? insets.left : 0,
                            paddingRight: drawerPosition === "right" ? insets.right : 0
                        }
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    {screens.map((item, index) => {
                        return (
                            <DrawerCustomItem
                                title={item}
                                key={index}
                                navigation={navigation}
                                focused={state.index === index ? true : false}
                            />
                        );
                    })}
                </ScrollView>
            </Block>
            {/* <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
                <DrawerCustomItem
                    title="Sign Out"
                    navigation={navigation}
                    focused={state.index === 9 ? true : false}
                    on
                />
            </Block> */}
            <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}
            >
                <Button
                    title="Sign Out"
                    buttonStyle={{ width: 300, borderRadius: 20 }}
                    onPress={handlePress}
                >Sign Out</Button>
            </Block>
        </Block>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#694fad',
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 2,
        justifyContent: 'center',
    },
    footer: {
        paddingHorizontal: 28,
        justifyContent: 'flex-end'
    },
    profile: {
        marginBottom: theme.SIZES.BASE / 2,
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 60,
        marginBottom: theme.SIZES.BASE,
        marginTop: theme.SIZES.BASE,
    },
    pro: {
        backgroundColor: materialTheme.COLORS.LABEL,
        paddingHorizontal: 6,
        marginRight: 8,
        borderRadius: 4,
        height: 19,
        width: 38,
    },
    seller: {
        marginRight: 16,
    }
});

export default CustomDrawerContent;
