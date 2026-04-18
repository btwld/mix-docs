/// RemixTooltip Example
///
/// Fortal tooltip shown on hover over a Fortal button.

library;

import 'package:flutter/material.dart';
import 'package:mix_docs_preview/helpers.dart';
import 'package:remix/remix.dart';

void main() {
  runMixApp(FortalScope(child: const Example()));
}

class Example extends StatelessWidget {
  const Example({super.key});

  @override
  Widget build(BuildContext context) {
    return RemixTooltip(
      tooltipChild: const Text('Fortal tooltip'),
      style: FortalTooltipStyles.create(),
      child: RemixButton(
        onPressed: () {},
        label: 'Hover me',
        style: FortalButtonStyle.solid(),
      ),
    );
  }
}
