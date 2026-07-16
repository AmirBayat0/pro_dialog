// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:pro_dialog/pro_dialog.dart';
// ─────────────────────────────────────────────────────────────────────────────
// DEMO APPLICATION
// ─────────────────────────────────────────────────────────────────────────────

void main() => runApp(const ProDialogDemoApp());

/// Root widget for the ProDialog demo application.
class ProDialogDemoApp extends StatefulWidget {
  const ProDialogDemoApp({super.key});

  @override
  State<ProDialogDemoApp> createState() => _ProDialogDemoAppState();
}

class _ProDialogDemoAppState extends State<ProDialogDemoApp> {
  ThemeMode _themeMode = ThemeMode.dark;

  void _toggleTheme() {
    setState(() {
      _themeMode =
          _themeMode == ThemeMode.dark ? ThemeMode.light : ThemeMode.dark;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ProDialog Demo',
      debugShowCheckedModeBanner: false,
      themeMode: _themeMode,
      theme: ThemeData(
        // useMaterial3: true,
        brightness: Brightness.light,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6C63FF),
          brightness: Brightness.light,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6C63FF),
          brightness: Brightness.dark,
        ),
        scaffoldBackgroundColor: const Color(0xFF0F0F1A),
      ),
      home: ProDialogDemoHome(onToggleTheme: _toggleTheme),
    );
  }
}

/// Home screen showcasing all dialog types and configurations.
class ProDialogDemoHome extends StatelessWidget {
  const ProDialogDemoHome({super.key, required this.onToggleTheme});

  final VoidCallback onToggleTheme;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'ProDialog',
              style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
            ),
            Text(
              'Flutter Dialog Package · v1.0.7',
              style: TextStyle(fontSize: 11, fontWeight: FontWeight.w400),
            ),
          ],
        ),
        actions: [
          IconButton(
            icon: Icon(
              isDark ? Icons.light_mode_rounded : Icons.dark_mode_rounded,
            ),
            onPressed: onToggleTheme,
            tooltip: 'Toggle theme',
          ),
          const SizedBox(width: 8),
        ],
        backgroundColor: isDark ? const Color(0xFF1A1A2E) : null,
        elevation: 0,
      ),
      backgroundColor: isDark ? const Color(0xFF0F0F1A) : null,
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 40),
        children: [
          // ── Section: Basic Types ──────────────────────────────────────────
          _SectionHeader(
            title: 'Predefined Dialog Types',
            subtitle: 'Auto-configured icon, color & animation',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'Success Dialog',
            subtitle: 'Bounce animation · Green · Check icon',
            color: const Color(0xFF22C55E),
            icon: Icons.check_circle_outline_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.success,
              title: 'Payment Complete',
              description:
                  'Your payment of \$49.99 was processed successfully. '
                  'A receipt has been sent to your email.',
              buttons: [
                DialogButton(
                  text: 'Close',
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'View Receipt',
                  isPrimary: true,
                  icon: Icons.receipt_long_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Error Dialog',
            subtitle: 'Shake animation · Red · Error icon',
            color: const Color(0xFFEF4444),
            icon: Icons.error_outline_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.error,
              title: 'Delete Account',
              description:
                  'Are you absolutely sure you want to delete your account? '
                  'All data will be permanently removed and this cannot be undone.',
              buttons: [
                DialogButton(
                  text: 'Cancel',
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Delete Forever',
                  isPrimary: true,
                  icon: Icons.delete_forever_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Warning Dialog',
            subtitle: 'Pulse animation · Amber · Warning icon',
            color: const Color(0xFFF59E0B),
            icon: Icons.warning_amber_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.warning,
              title: 'Unsaved Changes',
              description: 'You have unsaved changes in this document. '
                  'Leaving now will permanently discard all recent edits.',
              buttons: [
                DialogButton(
                  text: 'Discard',
                  style: DialogButtonStyle.outlined,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Save Changes',
                  isPrimary: true,
                  icon: Icons.save_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Info Dialog',
            subtitle: 'Fade animation · Blue · Info icon',
            color: const Color(0xFF3B82F6),
            icon: Icons.info_outline_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.info,
              title: 'App Update Available',
              description:
                  'Version 3.1.0 is now available with exciting new features, '
                  'performance improvements, and important security patches.',
              buttons: [
                DialogButton(
                  text: 'Later',
                  style: DialogButtonStyle.text,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Update Now',
                  isPrimary: true,
                  icon: Icons.system_update_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Question Dialog',
            subtitle: 'Rotate animation · Purple · Help icon',
            color: const Color(0xFF8B5CF6),
            icon: Icons.help_outline_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.question,
              title: 'Enable Notifications?',
              description:
                  'Stay up to date with personalized alerts, reminders, '
                  'and important updates tailored just for you.',
              buttons: [
                DialogButton(
                  text: 'No Thanks',
                  style: DialogButtonStyle.outlined,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Enable',
                  isPrimary: true,
                  icon: Icons.notifications_active_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // ── Section: Loading ──────────────────────────────────────────────
          _SectionHeader(
            title: 'Loading & Auto-Dismiss',
            subtitle: 'Async operations & timed dialogs',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'Loading Dialog',
            subtitle: 'Non-dismissible · Progress indicator',
            color: const Color(0xFF6C63FF),
            icon: Icons.hourglass_empty_rounded,
            onPressed: () async {
              showLoadingDialog(
                context,
                title: 'Uploading Files…',
                description: 'Please wait while we upload your files securely.',
              );
              await Future.delayed(const Duration(seconds: 3));
              if (context.mounted) Navigator.pop(context);
            },
          ),

          _DemoTile(
            label: 'Auto-Dismiss (2s)',
            subtitle: 'Dismisses automatically after a duration',
            color: const Color(0xFF22C55E),
            icon: Icons.timer_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.success,
              title: 'Auto-Dismissing!',
              description: 'This dialog will automatically close in 2 seconds.',
              autoDismissAfter: const Duration(seconds: 2),
            ),
          ),

          const SizedBox(height: 8),

          // ── Section: Animations ───────────────────────────────────────────
          _SectionHeader(
            title: 'Animation Styles',
            subtitle: 'Choose how dialogs enter the screen',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'Slide Up',
            subtitle: 'Dialog slides up from below',
            color: const Color(0xFF0EA5E9),
            icon: Icons.arrow_upward_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.info,
              title: 'Slide Up Animation',
              description: 'This dialog uses the slideUp animation style — '
                  'a Material-feel entry from below.',
              theme: const ProDialogTheme(
                animationStyle: DialogAnimationStyle.slideUp,
                iconAnimationStyle: IconAnimationStyle.none,
              ),
              buttons: [
                DialogButton(
                  text: 'Got it',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Fade In',
            subtitle: 'Gentle opacity fade animation',
            color: const Color(0xFF64748B),
            icon: Icons.blur_on_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.info,
              title: 'Fade Animation',
              description: 'This dialog uses a pure fade animation — '
                  'elegant and understated.',
              theme: const ProDialogTheme(
                animationStyle: DialogAnimationStyle.fade,
                iconAnimationStyle: IconAnimationStyle.none,
              ),
              buttons: [
                DialogButton(
                  text: 'Close',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // ── Section: Visual Modes ─────────────────────────────────────────
          _SectionHeader(
            title: 'Visual Modes',
            subtitle: 'Gradient, glassmorphism & custom themes',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'Gradient Background',
            subtitle: 'Full gradient dialog with white text',
            color: const Color(0xFF8B5CF6),
            icon: Icons.gradient_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.custom,
              title: 'Gradient Mode',
              description:
                  'The dialog background is filled with a beautiful gradient. '
                  'Typography and icons automatically switch to white.',
              icon: Icons.auto_awesome_rounded,
              theme: const ProDialogTheme(
                useGradientBackground: true,
                gradientColors: [Color(0xFF8B5CF6), Color(0xFF48CAE4)],
                animationStyle: DialogAnimationStyle.bounce,
                iconAnimationStyle: IconAnimationStyle.bounce,
                borderRadius: 28,
              ),
              buttons: [
                DialogButton(
                  text: 'Dismiss',
                  style: DialogButtonStyle.outlined,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Beautiful!',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Glassmorphism Mode',
            subtitle: 'Frosted glass + multi-gradient icon',
            color: const Color(0xFF0EA5E9),
            icon: Icons.blur_circular_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.custom,
              title: 'Glassmorphism',
              description:
                  'A frosted glass aesthetic with layered transparency, '
                  'perfect for modern app designs with vibrant wallpapers.',
              icon: Icons.diamond_rounded,
              theme: ProDialogTheme(
                useGlassmorphism: true,
                animationStyle: DialogAnimationStyle.scale,
                iconAnimationStyle: IconAnimationStyle.pulse,
                borderRadius: 32,
                shadowColor: const Color(0xFF6C63FF).withOpacity(0.4),
              ),
              buttons: [
                DialogButton(
                  text: 'Skip',
                  style: DialogButtonStyle.text,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Stunning!',
                  isPrimary: true,
                  icon: Icons.star_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Custom Gradient Colors',
            subtitle: 'Provide your own gradient palette',
            color: const Color(0xFFEC4899),
            icon: Icons.palette_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.custom,
              title: 'Custom Colors',
              description:
                  'Provide any gradient color list via gradientColors. '
                  'This example uses a vibrant pink-orange palette.',
              icon: Icons.palette_rounded,
              iconBackgroundColor: const Color(0xFFEC4899),
              theme: const ProDialogTheme(
                useGradientBackground: true,
                gradientColors: [Color(0xFFEC4899), Color(0xFFF97316)],
                animationStyle: DialogAnimationStyle.bounce,
                iconAnimationStyle: IconAnimationStyle.bounce,
                borderRadius: 24,
              ),
              buttons: [
                DialogButton(
                  text: 'Close',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // ── Section: Button Layouts ───────────────────────────────────────
          _SectionHeader(
            title: 'Button Layouts & Styles',
            subtitle: 'Horizontal, vertical, outlined, text',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'Vertical Buttons',
            subtitle: 'Stack buttons in a vertical column',
            color: const Color(0xFF6C63FF),
            icon: Icons.view_agenda_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.question,
              title: 'Choose Plan',
              description:
                  'Select the subscription plan that best fits your needs.',
              buttonsAxis: Axis.vertical,
              buttons: [
                DialogButton(
                  text: 'Pro — \$9.99/mo',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Basic — \$3.99/mo',
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Continue Free',
                  style: DialogButtonStyle.text,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Mixed Button Styles',
            subtitle: 'Filled, outlined, and text buttons together',
            color: const Color(0xFF22C55E),
            icon: Icons.grid_view_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.success,
              title: 'File Downloaded',
              description:
                  'Your file has been saved to your device successfully.',
              buttons: [
                DialogButton(
                  text: 'Share',
                  style: DialogButtonStyle.outlined,
                  icon: Icons.share_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Open File',
                  isPrimary: true,
                  icon: Icons.open_in_new_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // ── Section: Custom Content ───────────────────────────────────────
          _SectionHeader(
            title: 'Custom Content',
            subtitle: 'Embed any widget inside the dialog',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'Star Rating Widget',
            subtitle: 'Custom widgets inside the dialog body',
            color: const Color(0xFFF59E0B),
            icon: Icons.star_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.custom,
              title: 'Rate Your Experience',
              description: 'How would you rate today\'s session?',
              icon: Icons.favorite_rounded,
              iconBackgroundColor: const Color(0xFFF59E0B),
              customContent: const _StarRatingWidget(),
              buttons: [
                DialogButton(
                  text: 'Skip',
                  style: DialogButtonStyle.text,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Submit Rating',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'Permission Request',
            subtitle: 'Multi-item custom layout',
            color: const Color(0xFF3B82F6),
            icon: Icons.lock_open_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.custom,
              title: 'App Permissions',
              description:
                  'ProDialog needs the following permissions to work properly:',
              icon: Icons.security_rounded,
              iconBackgroundColor: const Color(0xFF3B82F6),
              customContent: const _PermissionsWidget(),
              buttons: [
                DialogButton(
                  text: 'Deny',
                  style: DialogButtonStyle.outlined,
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Allow All',
                  isPrimary: true,
                  icon: Icons.check_rounded,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 8),

          // ── Section: Special Configs ──────────────────────────────────────
          _SectionHeader(
            title: 'Special Configurations',
            subtitle: 'Close button, max-width, custom radius',
            isDark: isDark,
          ),

          _DemoTile(
            label: 'With Close Button',
            subtitle: 'Adds an X button to the top-right corner',
            color: const Color(0xFF64748B),
            icon: Icons.close_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.info,
              title: 'Closeable Dialog',
              description: 'This dialog shows an X button in the corner '
                  'for quick dismissal without requiring a button.',
              showCloseButton: true,
              barrierDismissible: false,
            ),
          ),

          _DemoTile(
            label: 'Large Border Radius',
            subtitle: 'Pill-shaped dialog corners (radius: 40)',
            color: const Color(0xFF6C63FF),
            icon: Icons.rounded_corner_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.success,
              title: 'Pill Corners',
              description:
                  'Very large border radius creates a distinctive pill-shaped '
                  'dialog card — great for modern minimalist designs.',
              theme: const ProDialogTheme(borderRadius: 40),
              buttons: [
                DialogButton(
                  text: 'Close',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          _DemoTile(
            label: 'No Icon Background',
            subtitle: 'Bare icon without circle background',
            color: const Color(0xFF8B5CF6),
            icon: Icons.remove_circle_outline_rounded,
            onPressed: () => showProDialog(
              context,
              type: DialogType.question,
              title: 'Minimal Look',
              description:
                  'Icon rendered without the circular background for a '
                  'cleaner, more understated appearance.',
              iconColor: const Color(0xFF8B5CF6),
              theme: const ProDialogTheme(showIconBackground: false),
              buttons: [
                DialogButton(
                  text: 'No',
                  onPressed: () => Navigator.pop(context),
                ),
                DialogButton(
                  text: 'Yes',
                  isPrimary: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          const SizedBox(height: 32),

          // ── Footer note ───────────────────────────────────────────────────
          Center(
            child: Text(
              'ProDialog v1.0.9 · MIT License\n'
              'Zero external dependencies · Works on all Flutter platforms',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 12,
                color: isDark ? Colors.white24 : Colors.black26,
                height: 1.7,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DEMO HELPER WIDGETS
// ─────────────────────────────────────────────────────────────────────────────

/// Section header used to group demo buttons.
class _SectionHeader extends StatelessWidget {
  const _SectionHeader({
    required this.title,
    required this.subtitle,
    required this.isDark,
  });

  final String title;
  final String subtitle;
  final bool isDark;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 20.0, bottom: 12.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.w800,
              color: isDark ? Colors.white : Colors.black,
              letterSpacing: -0.2,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            style: TextStyle(
              fontSize: 12,
              color: isDark ? Colors.white38 : Colors.black38,
            ),
          ),
          const SizedBox(height: 8),
          Divider(color: isDark ? Colors.white10 : Colors.black12, height: 1),
        ],
      ),
    );
  }
}

/// Demo tile button in the showcase list.
class _DemoTile extends StatelessWidget {
  const _DemoTile({
    required this.label,
    required this.subtitle,
    required this.color,
    required this.icon,
    required this.onPressed,
  });

  final String label;
  final String subtitle;
  final Color color;
  final IconData icon;
  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Padding(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: Material(
        color: isDark
            ? Colors.white.withOpacity(0.04)
            : Colors.black.withOpacity(0.03),
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16),
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 16.0,
              vertical: 14.0,
            ),
            child: Row(
              children: [
                Container(
                  width: 44,
                  height: 44,
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(icon, color: color, size: 22),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        label,
                        style: TextStyle(
                          fontWeight: FontWeight.w700,
                          fontSize: 14,
                          color: isDark ? Colors.white : Colors.black,
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        subtitle,
                        style: TextStyle(
                          fontSize: 12,
                          color: isDark ? Colors.white38 : Colors.black38,
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.chevron_right_rounded,
                  color: isDark ? Colors.white24 : Colors.black26,
                  size: 20,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Interactive star rating widget used in the custom content demo.
class _StarRatingWidget extends StatefulWidget {
  const _StarRatingWidget();

  @override
  State<_StarRatingWidget> createState() => _StarRatingWidgetState();
}

class _StarRatingWidgetState extends State<_StarRatingWidget> {
  int _rating = 4;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            5,
            (i) => GestureDetector(
              onTap: () => setState(() => _rating = i + 1),
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 150),
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Icon(
                  i < _rating ? Icons.star_rounded : Icons.star_outline_rounded,
                  color: i < _rating ? const Color(0xFFF59E0B) : Colors.white30,
                  size: 38,
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(
          _rating == 5
              ? 'Excellent!'
              : _rating == 4
                  ? 'Great!'
                  : _rating == 3
                      ? 'Good'
                      : _rating == 2
                          ? 'Fair'
                          : 'Poor',
          style: const TextStyle(
            color: Colors.white70,
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}

/// Permission list widget used in the custom content demo.
class _PermissionsWidget extends StatelessWidget {
  const _PermissionsWidget();

  static const _perms = [
    (Icons.camera_alt_rounded, 'Camera', 'For profile photos & QR scanning'),
    (Icons.location_on_rounded, 'Location', 'For nearby features & map'),
    (Icons.notifications_rounded, 'Notifications', 'For alerts & reminders'),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: _perms
          .map(
            (p) => Padding(
              padding: const EdgeInsets.only(bottom: 10.0),
              child: Row(
                children: [
                  Container(
                    width: 38,
                    height: 38,
                    decoration: BoxDecoration(
                      color: const Color(0xFF3B82F6).withOpacity(0.15),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Icon(p.$1, color: const Color(0xFF3B82F6), size: 20),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          p.$2,
                          style: const TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w700,
                            fontSize: 13,
                          ),
                        ),
                        Text(
                          p.$3,
                          style: const TextStyle(
                            color: Colors.white38,
                            fontSize: 11,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Icon(
                    Icons.check_circle_rounded,
                    color: Color(0xFF22C55E),
                    size: 20,
                  ),
                ],
              ),
            ),
          )
          .toList(),
    );
  }
}
