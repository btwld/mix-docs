/// RemixSelect Example
///
/// Select dropdown with two items — one enabled, one disabled.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(const Example());
}

class Example extends StatefulWidget {
  const Example({super.key});

  @override
  State<Example> createState() => _ExampleState();
}

class _ExampleState extends State<Example> {
  String? _selectedValue;

  @override
  Widget build(BuildContext context) {
    return RemixSelect(
      trigger: const RemixSelectTrigger(placeholder: 'Text Value'),
      items: [
        RemixSelectItem(
          value: 'option1',
          label: 'Option 1',
          enabled: true,
          style: itemStyle,
        ),
        RemixSelectItem(
          value: 'option2',
          label: 'Option 2',
          enabled: false,
          style: itemStyle,
        ),
      ],
      selectedValue: _selectedValue,
      style: style,
      onChanged: (value) {
        setState(() {
          _selectedValue = value;
        });
      },
    );
  }

  RemixSelectMenuItemStyle get itemStyle {
    return RemixSelectMenuItemStyle()
        .iconSize(16)
        .paddingAll(8)
        .borderRadiusAll(const Radius.circular(8))
        .onHovered(RemixSelectMenuItemStyle().color(Colors.blueGrey.shade50))
        .onDisabled(
          RemixSelectMenuItemStyle().labelColor(Colors.grey.shade300),
        );
  }

  RemixSelectStyle get style {
    return RemixSelectStyle()
        .trigger(
          RemixSelectTriggerStyle()
              .color(Colors.transparent)
              .borderAll(color: const Color(0xFF898988))
              .paddingY(10)
              .paddingX(12)
              .borderRadiusAll(const Radius.circular(12)),
        )
        .menuContainer(
          FlexBoxStyler()
              .width(200)
              .marginY(5)
              .paddingAll(6)
              .color(Colors.white)
              .borderRadiusAll(const Radius.circular(12)),
        );
  }
}
