import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useTheme} from '../themes';
import {
  BottomSheet,
  Button,
  Checkbox,
  Modal,
  Switch,
  Text,
  TextField,
} from './Base';
import CoffeeIcon from '../assets/Icons/Coffee.svg';

export const Placeholder = ({route}) => {
  const theme = useTheme();

  const [checked, setChecked] = React.useState<boolean>(false);
  const [switched, setSwitched] = React.useState<boolean>(false);
  const [inputField, setInputField] = React.useState<string>('input');
  const bottomRef = React.useRef<BottomSheetModal>(null);
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        alignItems: 'center',
        flexGrow: 1,
      }}
      style={{
        backgroundColor: theme.colors.background,
      }}>
      <Text color={theme.colors.primary} size="large" type="display">
        {route.name}
      </Text>

      {/* <Text color={theme.colors.onBackground} size="large" type="display">
        Large Display
      </Text>
      <Text color={theme.colors.onBackground} size="medium" type="display">
        Medium Display
      </Text>
      <Text color={theme.colors.onBackground} size="small" type="display">
        Small Display
      </Text>
      <Text color={theme.colors.onBackground} size="large" type="headline">
        Large Headline
      </Text>
      <Text color={theme.colors.onBackground} size="medium" type="headline">
        Medium Headline
      </Text>
      <Text color={theme.colors.onBackground} size="small" type="headline">
        Small Headline
      </Text>
      <Text color={theme.colors.onBackground} size="large" type="title">
        Large Title
      </Text>
      <Text color={theme.colors.onBackground} size="medium" type="title">
        Medium Title
      </Text>
      <Text color={theme.colors.onBackground} size="small" type="title">
        Small Title
      </Text>
      <Text color={theme.colors.onBackground} size="large" type="body">
        Large Body
      </Text>
      <Text color={theme.colors.onBackground} size="medium" type="body">
        Medium Body
      </Text>
      <Text color={theme.colors.onBackground} size="small" type="body">
        Small Body
      </Text>
      <Text color={theme.colors.onBackground} size="large" type="label">
        Large label
      </Text>
      <Text color={theme.colors.onBackground} size="medium" type="label">
        Medium label
      </Text>
      <Text color={theme.colors.onBackground} size="small" type="label">
        Small label
      </Text>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <View>
          <Button
            type="primary"
            onPress={() => console.log('Primary button pressed')}>
            Primary Button
          </Button>
          <Button
            type="secondary"
            onPress={() => console.log('Secondary button pressed')}>
            Secondary Button
          </Button>

          <Button
            type="outline"
            onPress={() => console.log('Outline button pressed')}>
            Outline Button
          </Button>

          <Button
            type="text"
            onPress={() => console.log('Text button pressed')}>
            Text Button
          </Button>
        </View>
        <View>
          <Button
            disabled
            type="primary"
            onPress={() => console.log('Primary button pressed')}>
            Primary Button
          </Button>
          <Button
            disabled
            type="secondary"
            onPress={() => console.log('Secondary button pressed')}>
            Secondary Button
          </Button>

          <Button
            disabled
            type="outline"
            onPress={() => console.log('Outline button pressed')}>
            Outline Button
          </Button>

          <Button
            disabled
            type="text"
            onPress={() => console.log('Text button pressed')}>
            Text Button
          </Button>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Checkbox initialValue={checked} onValueChange={setChecked} />
        <Switch initialValue={switched} onValueChange={setSwitched} />
      </View>
      <Button type="primary" onPress={() => bottomRef.current?.present()}>
        BottomSheet
      </Button>
      <BottomSheet
        bottomSheetModalRef={bottomRef}
        heading="BottomSheet Title"
        subheading="ButtomSheet Subtitle"
        primaryButtonlabel="Save"
        primaryButtonOnPress={() =>
          console.log('BottomSheet primary button pressed.')
        }>
        <Text type="body" size="large" color={theme.colors.onSurface}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
          exercitationem suscipit eaque modi dignissimos, ducimus, vero nulla
          aut rem quia et voluptas fugiat esse quo non ea possimus! Ipsa,
          doloremque. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reiciendis exercitationem suscipit eaque modi dignissimos, ducimus,
          vero nulla aut rem quia et voluptas fugiat esse quo non ea possimus!
          Ipsa, doloremque. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Reiciendis exercitationem suscipit eaque modi dignissimos,
          ducimus, vero nulla aut rem quia et voluptas fugiat esse quo non ea
          possimus! Ipsa, doloremque. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Reiciendis exercitationem suscipit eaque modi
          dignissimos, ducimus, vero nulla aut rem quia et voluptas fugiat esse
          quo non ea possimus! Ipsa, doloremque.
        </Text>
      </BottomSheet>
      <Button type="primary" onPress={() => setModalVisible(true)}>
        Modal
      </Button>
      <Modal
        visible={modalVisible}
        setIsVisible={setModalVisible}
        heading="Modal Title"
        subheading="Modal Subtitle"
        primaryButtonlabel="Confirm"
        primaryButtonOnPress={() =>
          console.log('Modal primary button pressed.')
        }>
        <Text type="body" size="large" color={theme.colors.onSurface}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis
          exercitationem suscipit eaque modi dignissimos, ducimus, vero nulla
          aut rem quia et voluptas fugiat esse quo non ea possimus! Ipsa,
          doloremque. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Reiciendis exercitationem suscipit eaque modi dignissimos, ducimus,
          vero nulla aut rem quia et voluptas fugiat esse quo non ea possimus!
          Ipsa, doloremque. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Reiciendis exercitationem suscipit eaque modi dignissimos,
          ducimus, vero nulla aut rem quia et voluptas fugiat esse quo non ea
          possimus! Ipsa, doloremque. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Reiciendis exercitationem suscipit eaque modi
          dignissimos, ducimus, vero nulla aut rem quia et voluptas fugiat esse
          quo non ea possimus! Ipsa, doloremque.
        </Text>
      </Modal>

      <TextField
        onChangeText={setInputField}
        type="filled"
        placeholder="Filled Input"
        label="Filled Input"
      />
      <TextField
        onChangeText={setInputField}
        type="outline"
        placeholder="Outline Input"
        label="Outline Input"
      />
      <TextField
        isPassword
        onChangeText={setInputField}
        type="filled"
        placeholder="Password Input"
        label="Password Input"
        LeftIcon={CoffeeIcon}
      />
      <TextField
        isPassword
        onChangeText={setInputField}
        type="outline"
        placeholder="Password Input"
        label="Password Input"
        LeftIcon={CoffeeIcon}
      /> */}
    </ScrollView>
  );
};
