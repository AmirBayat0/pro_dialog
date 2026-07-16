// ╔══════════════════════════════════════════════════════════════════════════╗
// ║                    ProDialog — Flutter Dialog Package                    ║
// ║           Animated · Customizable · Production-Ready · v            ║
// ║                                                                          ║
// ║  A beautiful, highly reusable, animated dialog framework for Flutter.    ║
// ║  Drop into any project — zero external dependencies required.            ║
// ║                                                                          ║
// ║  MIT License © 2024 ProDialog Contributors                               ║
// ╚══════════════════════════════════════════════════════════════════════════╝

// ignore_for_file: deprecated_member_use

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTS
// ─────────────────────────────────────────────────────────────────────────────
import 'dart:math' as math;
import 'package:flutter/material.dart';

// ─────────────────────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────────────────────

/// The visual and behavioral type of the dialog.
///
/// Each type ships with smart defaults for icon, color, shadow, and animation.
/// You can override any property after selecting a type.
///
/// ```dart
/// showProDialog(context, type: DialogType.success, title: 'Done!');
/// ```
enum DialogType {
  /// Green check-circle. Bounce animation. Ideal for completed operations.
  success,

  /// Red error circle. Shake animation. Ideal for destructive confirmations.
  error,

  /// Amber warning triangle. Pulse animation. Ideal for cautionary actions.
  warning,

  /// Blue info circle. Fade animation. Ideal for informational messages.
  info,

  /// Purple help circle. Rotate animation. Ideal for confirmations/choices.
  question,

  /// Fully custom. No opinionated defaults. Bring your own everything.
  custom,
}

/// Controls the dialog's entry and exit animation style.
enum DialogAnimationStyle {
  /// Scales from 0 → 1 with an elastic overshoot. Also fades in.
  scale,

  /// Pure opacity fade — subtle and elegant.
  fade,

  /// Slides up from below while fading in. Material-feel.
  slideUp,

  /// Slides down from above while fading in.
  slideDown,

  /// Scale with elastic bounce — the most energetic entry.
  bounce,
}

/// Controls the icon's looping or one-shot animation.
enum IconAnimationStyle {
  /// No icon animation.
  none,

  /// Bounces in using elastic scale — great for success.
  bounce,

  /// Continuously pulses (scale up/down) — great for warnings.
  pulse,

  /// Rotates 360° once on entry — great for question/info.
  rotate,

  /// Horizontal shake on entry — great for errors.
  shake,
}

/// Visual style variants for [DialogButton].
enum DialogButtonStyle {
  /// Solid filled background (default).
  filled,

  /// Outlined border, transparent background.
  outlined,

  /// Text-only button, no background or border.
  text,
}

// ─────────────────────────────────────────────────────────────────────────────
// MODELS
// ─────────────────────────────────────────────────────────────────────────────

/// Represents a single action button inside a [showProDialog] call.
///
/// Supports icons, loading indicators, custom widgets, and three visual styles.
///
/// ```dart
/// DialogButton(
///   text: 'Confirm',
///   isPrimary: true,
///   icon: Icons.check,
///   onPressed: () => Navigator.pop(context),
/// )
/// ```
class DialogButton {
  const DialogButton({
    required this.text,
    required this.onPressed,
    this.isPrimary = false,
    this.style = DialogButtonStyle.filled,
    this.color,
    this.icon,
    this.isLoading = false,
    this.customWidget,
    this.semanticLabel,
  });

  /// The button label text.
  final String text;

  /// Callback invoked when the button is tapped.
  final VoidCallback onPressed;

  /// Whether this is the primary (highlighted) button.
  final bool isPrimary;

  /// Visual style: filled, outlined, or text-only.
  final DialogButtonStyle style;

  /// Override the button color. Defaults to the dialog type color.
  final Color? color;

  /// Optional leading icon displayed before the text.
  final IconData? icon;

  /// Shows a [CircularProgressIndicator] instead of text.
  final bool isLoading;

  /// Fully replaces the button UI with a custom widget.
  final Widget? customWidget;

  /// Accessibility label for screen readers.
  final String? semanticLabel;
}

/// Full theme configuration for [showProDialog].
///
/// Every property has a sensible default. Override only what you need.
///
/// ```dart
/// ProDialogTheme(
///   useGlassmorphism: true,
///   borderRadius: 28,
///   animationStyle: DialogAnimationStyle.slideUp,
///   iconAnimationStyle: IconAnimationStyle.pulse,
/// )
/// ```
class ProDialogTheme {
  const ProDialogTheme({
    this.backgroundColor,
    this.useGlassmorphism = false,
    this.useGradientBackground = false,
    this.gradientColors,
    this.gradientBegin = Alignment.topLeft,
    this.gradientEnd = Alignment.bottomRight,
    this.borderRadius = 24.0,
    this.iconSize = 48.0,
    this.titleStyle,
    this.descriptionStyle,
    this.animationStyle = DialogAnimationStyle.bounce,
    this.iconAnimationStyle = IconAnimationStyle.bounce,
    this.showIconBackground = true,
    this.iconBackgroundSize,
    this.maxWidth = 380.0,
    this.contentPadding,
    this.elevation = 24.0,
    this.shadowColor,
    this.barrierColor,
    this.entryDuration = const Duration(milliseconds: 480),
    this.iconAnimDuration = const Duration(milliseconds: 700),
  });

  /// Dialog background color. Defaults to surface color.
  final Color? backgroundColor;

  /// Enable frosted glass (glassmorphism) effect.
  final bool useGlassmorphism;

  /// Fill the dialog background with a gradient.
  final bool useGradientBackground;

  /// Colors for the gradient background (requires [useGradientBackground]).
  final List<Color>? gradientColors;

  /// Gradient begin alignment.
  final AlignmentGeometry gradientBegin;

  /// Gradient end alignment.
  final AlignmentGeometry gradientEnd;

  /// Corner radius of the dialog card.
  final double borderRadius;

  /// Size of the icon widget.
  final double iconSize;

  /// Style override for the title text.
  final TextStyle? titleStyle;

  /// Style override for the description text.
  final TextStyle? descriptionStyle;

  /// How the dialog enters and exits the screen.
  final DialogAnimationStyle animationStyle;

  /// How the icon animates after the dialog appears.
  final IconAnimationStyle iconAnimationStyle;

  /// Whether to show a circular background behind the icon.
  final bool showIconBackground;

  /// Size of the icon background circle. Defaults to [iconSize] + 32.
  final double? iconBackgroundSize;

  /// Maximum dialog width. Constrains on tablets and desktops.
  final double maxWidth;

  /// Padding around the dialog content.
  final EdgeInsetsGeometry? contentPadding;

  /// Material elevation of the dialog card.
  final double elevation;

  /// Color of the dialog's drop shadow.
  final Color? shadowColor;

  /// Color of the modal barrier behind the dialog.
  final Color? barrierColor;

  /// Duration of the entry animation.
  final Duration entryDuration;

  /// Duration of the icon animation.
  final Duration iconAnimDuration;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERNAL: TYPE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

/// Internal configuration derived from [DialogType].
/// Not part of the public API.
class _TypeConfig {
  const _TypeConfig({
    required this.icon,
    required this.primaryColor,
    required this.gradientEnd,
    required this.defaultAnimStyle,
    required this.defaultIconAnim,
    required this.semanticLabel,
  });

  final IconData icon;
  final Color primaryColor;
  final Color gradientEnd;
  final DialogAnimationStyle defaultAnimStyle;
  final IconAnimationStyle defaultIconAnim;
  final String semanticLabel;

  /// Resolves the [_TypeConfig] for a given [DialogType].
  static _TypeConfig forType(DialogType type) {
    switch (type) {
      case DialogType.success:
        return const _TypeConfig(
          icon: Icons.check_circle_rounded,
          primaryColor: Color(0xFF22C55E),
          gradientEnd: Color(0xFF16A34A),
          defaultAnimStyle: DialogAnimationStyle.bounce,
          defaultIconAnim: IconAnimationStyle.bounce,
          semanticLabel: 'Success dialog',
        );

      case DialogType.error:
        return const _TypeConfig(
          icon: Icons.error_rounded,
          primaryColor: Color(0xFFEF4444),
          gradientEnd: Color(0xFFB91C1C),
          defaultAnimStyle: DialogAnimationStyle.scale,
          defaultIconAnim: IconAnimationStyle.shake,
          semanticLabel: 'Error dialog',
        );

      case DialogType.warning:
        return const _TypeConfig(
          icon: Icons.warning_rounded,
          primaryColor: Color(0xFFF59E0B),
          gradientEnd: Color(0xFFD97706),
          defaultAnimStyle: DialogAnimationStyle.slideUp,
          defaultIconAnim: IconAnimationStyle.pulse,
          semanticLabel: 'Warning dialog',
        );

      case DialogType.info:
        return const _TypeConfig(
          icon: Icons.info_rounded,
          primaryColor: Color(0xFF3B82F6),
          gradientEnd: Color(0xFF1D4ED8),
          defaultAnimStyle: DialogAnimationStyle.fade,
          defaultIconAnim: IconAnimationStyle.none,
          semanticLabel: 'Information dialog',
        );

      case DialogType.question:
        return const _TypeConfig(
          icon: Icons.help_rounded,
          primaryColor: Color(0xFF8B5CF6),
          gradientEnd: Color(0xFF6D28D9),
          defaultAnimStyle: DialogAnimationStyle.slideUp,
          defaultIconAnim: IconAnimationStyle.rotate,
          semanticLabel: 'Question dialog',
        );

      case DialogType.custom:
      // ignore: no_default_cases, unreachable_switch_default
      default:
        return const _TypeConfig(
          icon: Icons.widgets_rounded,
          primaryColor: Color(0xFF6C63FF),
          gradientEnd: Color(0xFF48CAE4),
          defaultAnimStyle: DialogAnimationStyle.scale,
          defaultIconAnim: IconAnimationStyle.none,
          semanticLabel: 'Dialog',
        );
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE DIALOG WIDGET (private StatefulWidget)
// ─────────────────────────────────────────────────────────────────────────────

/// The internal animated dialog widget.
/// Use [showProDialog] to display it — do not instantiate directly.
class _ProDialogWidget extends StatefulWidget {
  const _ProDialogWidget({
    required this.type,
    this.title,
    this.description,
    this.icon,
    this.iconColor,
    this.iconBackgroundColor,
    this.buttons = const [],
    this.buttonsAxis = Axis.horizontal,
    this.customContent,
    this.isLoading = false,
    this.theme,
    this.autoDismissAfter,
    this.onDismiss,
    this.showCloseButton = false,
  });

  final DialogType type;
  final String? title;
  final String? description;
  final IconData? icon;
  final Color? iconColor;
  final Color? iconBackgroundColor;
  final List<DialogButton> buttons;
  final Axis buttonsAxis;
  final Widget? customContent;
  final bool isLoading;
  final ProDialogTheme? theme;
  final Duration? autoDismissAfter;
  final VoidCallback? onDismiss;
  final bool showCloseButton;

  @override
  State<_ProDialogWidget> createState() => _ProDialogWidgetState();
}

class _ProDialogWidgetState extends State<_ProDialogWidget>
    with TickerProviderStateMixin {
  // ── Animation Controllers ─────────────────────────────────────────────────

  /// Drives the dialog's entry/exit animation.
  late final AnimationController _entryCtrl;

  /// Drives the icon's one-shot animation (bounce, rotate, shake).
  late final AnimationController _iconCtrl;

  /// Drives the icon's repeating animation (pulse).
  late final AnimationController _pulseCtrl;

  // ── Animations ────────────────────────────────────────────────────────────
  late final Animation<double> _scaleAnim;
  late final Animation<double> _fadeAnim;
  late final Animation<Offset> _slideUpAnim;
  late final Animation<Offset> _slideDownAnim;
  late final Animation<double> _iconBounceAnim;
  late final Animation<double> _iconRotateAnim;
  late final Animation<double> _pulseAnim;

  late final _TypeConfig _cfg;

  @override
  void initState() {
    super.initState();
    _cfg = _TypeConfig.forType(widget.type);
    final theme = widget.theme ?? const ProDialogTheme();

    // ── Entry controller setup ───────────────────────────────────────────────
    _entryCtrl = AnimationController(
      vsync: this,
      duration: theme.entryDuration,
    );

    // ── Icon one-shot controller ─────────────────────────────────────────────
    _iconCtrl = AnimationController(
      vsync: this,
      duration: theme.iconAnimDuration,
    );

    // ── Pulse (repeat) controller ────────────────────────────────────────────
    _pulseCtrl = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1600),
    )..repeat(reverse: true);

    // ── Curved animation wrappers ────────────────────────────────────────────
    final elasticCurve = CurvedAnimation(
      parent: _entryCtrl,
      curve: Curves.elasticOut,
    );
    final easeOutCubic = CurvedAnimation(
      parent: _entryCtrl,
      curve: Curves.easeOutCubic,
    );

    // Entry animations
    _scaleAnim = Tween<double>(begin: 0.0, end: 1.0).animate(elasticCurve);
    _fadeAnim = Tween<double>(begin: 0.0, end: 1.0).animate(easeOutCubic);
    _slideUpAnim = Tween<Offset>(
      begin: const Offset(0.0, 0.45),
      end: Offset.zero,
    ).animate(easeOutCubic);
    _slideDownAnim = Tween<Offset>(
      begin: const Offset(0.0, -0.45),
      end: Offset.zero,
    ).animate(easeOutCubic);

    // Icon animations
    _iconBounceAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _iconCtrl, curve: Curves.elasticOut));
    _iconRotateAnim = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _iconCtrl, curve: Curves.easeOutBack));
    _pulseAnim = Tween<double>(
      begin: 1.0,
      end: 1.14,
    ).animate(CurvedAnimation(parent: _pulseCtrl, curve: Curves.easeInOut));

    // Start entry animation immediately
    _entryCtrl.forward();

    // Delay icon animation slightly so it fires after entry settles
    Future.delayed(const Duration(milliseconds: 220), () {
      if (mounted) _iconCtrl.forward();
    });

    // Auto-dismiss if requested
    if (widget.autoDismissAfter != null) {
      Future.delayed(widget.autoDismissAfter!, () {
        if (mounted) {
          widget.onDismiss?.call();
          Navigator.of(context).pop();
        }
      });
    }
  }

  @override
  void dispose() {
    _entryCtrl.dispose();
    _iconCtrl.dispose();
    _pulseCtrl.dispose();
    super.dispose();
  }

  // ── Build ──────────────────────────────────────────────────────────────────

  @override
  Widget build(BuildContext context) {
    final t = widget.theme ?? const ProDialogTheme();
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final typeColor = _cfg.primaryColor;
    final animStyle = t.animationStyle;

    Widget child = _buildDialogCard(t, isDark, typeColor);

    // Wrap with the appropriate entry animation
    switch (animStyle) {
      case DialogAnimationStyle.scale:
        child = ScaleTransition(
          scale: _scaleAnim,
          child: FadeTransition(opacity: _fadeAnim, child: child),
        );
        break;
      case DialogAnimationStyle.bounce:
        child = ScaleTransition(
          scale: _scaleAnim,
          child: FadeTransition(opacity: _fadeAnim, child: child),
        );
        break;
      case DialogAnimationStyle.fade:
        child = FadeTransition(opacity: _fadeAnim, child: child);
        break;
      case DialogAnimationStyle.slideUp:
        child = SlideTransition(
          position: _slideUpAnim,
          child: FadeTransition(opacity: _fadeAnim, child: child),
        );
        break;
      case DialogAnimationStyle.slideDown:
        child = SlideTransition(
          position: _slideDownAnim,
          child: FadeTransition(opacity: _fadeAnim, child: child),
        );
        break;
    }

    return Semantics(
      label: _cfg.semanticLabel,
      child: ConstrainedBox(
        constraints: BoxConstraints(maxWidth: t.maxWidth),
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 12),
          child: Center(child: child),
        ),
      ),
    );
  }

  // ── Dialog Card ────────────────────────────────────────────────────────────

  Widget _buildDialogCard(ProDialogTheme t, bool isDark, Color typeColor) {
    final bgColor =
        t.backgroundColor ?? (isDark ? const Color(0xFF1E1E2E) : Colors.white);

    final shadowColor = t.shadowColor ?? typeColor.withOpacity(0.28);

    // Determine content widget
    final Widget content = _buildContent(t, isDark, typeColor);

    // Wrap in appropriate decoration
    Widget card;

    if (t.useGlassmorphism) {
      card = _buildGlassCard(t, content);
    } else if (t.useGradientBackground) {
      card = _buildGradientCard(t, typeColor, content);
    } else {
      card = _buildSolidCard(t, bgColor, shadowColor, content);
    }

    // Close button overlay
    if (widget.showCloseButton) {
      card = Stack(
        children: [
          card,
          Positioned(
            top: 8,
            right: 8,
            child: IconButton(
              icon: const Icon(Icons.close_rounded),
              color: isDark ? Colors.white38 : Colors.black38,
              iconSize: 20,
              onPressed: () => Navigator.of(context).pop(),
              tooltip: 'Close',
            ),
          ),
        ],
      );
    }

    return card;
  }

  Widget _buildSolidCard(
    ProDialogTheme t,
    Color bgColor,
    Color shadowColor,
    Widget content,
  ) {
    return Material(
      color: bgColor,
      borderRadius: BorderRadius.circular(t.borderRadius),
      elevation: t.elevation,
      shadowColor: shadowColor,
      child: content,
    );
  }

  Widget _buildGlassCard(ProDialogTheme t, Widget content) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(t.borderRadius),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.10),
          borderRadius: BorderRadius.circular(t.borderRadius),
          border: Border.all(color: Colors.white.withOpacity(0.18), width: 1.2),
        ),
        // BackdropFilter would need dart:ui — using approximation
        child: content,
      ),
    );
  }

  Widget _buildGradientCard(ProDialogTheme t, Color typeColor, Widget content) {
    return Material(
      color: Colors.transparent,
      borderRadius: BorderRadius.circular(t.borderRadius),
      elevation: t.elevation,
      shadowColor: typeColor.withOpacity(0.3),
      child: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: t.gradientBegin,
            end: t.gradientEnd,
            colors: t.gradientColors ?? [typeColor, _cfg.gradientEnd],
          ),
          borderRadius: BorderRadius.circular(t.borderRadius),
        ),
        child: content,
      ),
    );
  }

  // ── Content ─────────────────────────────────────────────────────────────────

  Widget _buildContent(ProDialogTheme t, bool isDark, Color typeColor) {
    return Padding(
      padding:
          t.contentPadding ?? const EdgeInsets.fromLTRB(24.0, 32.0, 24.0, 24.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Icon
          Center(child: _buildIcon(t, typeColor, isDark)),

          const SizedBox(height: 20.0),

          // Title
          if (widget.title != null) ...[_buildTitle(t, isDark)],

          // Description
          if (widget.description != null) ...[
            const SizedBox(height: 8.0),
            _buildDescription(t, isDark),
          ],

          // Custom content
          if (widget.customContent != null) ...[
            const SizedBox(height: 16.0),
            widget.customContent!,
          ],

          // Loading indicator
          if (widget.isLoading) ...[
            const SizedBox(height: 24.0),
            _buildLoadingIndicator(typeColor),
          ],

          // Buttons
          if (widget.buttons.isNotEmpty) ...[
            const SizedBox(height: 24.0),
            _buildButtonsSection(t, typeColor, isDark),
          ],
        ],
      ),
    );
  }

  // ── Icon ───────────────────────────────────────────────────────────────────

  Widget _buildIcon(ProDialogTheme t, Color typeColor, bool isDark) {
    final iconData = widget.icon ?? _cfg.icon;
    final bgSize = t.iconBackgroundSize ?? (t.iconSize + 32.0);

    // Core icon or spinner
    Widget iconCore = widget.isLoading
        ? SizedBox(
            width: t.iconSize,
            height: t.iconSize,
            child: CircularProgressIndicator(
              strokeWidth: 3.0,
              strokeCap: StrokeCap.round,
              valueColor: AlwaysStoppedAnimation<Color>(
                t.useGradientBackground ? Colors.white : typeColor,
              ),
            ),
          )
        : Icon(
            iconData,
            size: t.iconSize,
            color: widget.iconColor ??
                (t.useGradientBackground || t.useGlassmorphism
                    ? Colors.white
                    : Colors.white),
          );

    // Optionally wrap in circular background
    if (t.showIconBackground) {
      iconCore = Container(
        width: bgSize,
        height: bgSize,
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [widget.iconBackgroundColor ?? typeColor, _cfg.gradientEnd],
          ),
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: typeColor.withOpacity(0.38),
              blurRadius: 24.0,
              spreadRadius: 2.0,
              offset: const Offset(0, 6),
            ),
          ],
        ),
        child: Center(child: iconCore),
      );
    }

    // Apply icon animation
    final iconAnimStyle = t.iconAnimationStyle;
    switch (iconAnimStyle) {
      case IconAnimationStyle.bounce:
        return ScaleTransition(scale: _iconBounceAnim, child: iconCore);

      case IconAnimationStyle.rotate:
        return RotationTransition(turns: _iconRotateAnim, child: iconCore);

      case IconAnimationStyle.pulse:
        return ScaleTransition(scale: _pulseAnim, child: iconCore);

      case IconAnimationStyle.shake:
        return AnimatedBuilder(
          animation: _iconCtrl,
          builder: (_, child) => Transform.translate(
            offset: Offset(
              math.sin(_iconCtrl.value * math.pi * 8.0) * 5.0,
              0.0,
            ),
            child: child,
          ),
          child: iconCore,
        );

      case IconAnimationStyle.none:
        return iconCore;
    }
  }

  // ── Typography ─────────────────────────────────────────────────────────────

  Widget _buildTitle(ProDialogTheme t, bool isDark) {
    final bool lightText = t.useGradientBackground || t.useGlassmorphism;

    return Text(
      widget.title!,
      textAlign: TextAlign.center,
      style: t.titleStyle ??
          TextStyle(
            fontSize: 20.0,
            fontWeight: FontWeight.w800,
            letterSpacing: -0.4,
            color: lightText
                ? Colors.white
                : (isDark ? Colors.white : const Color(0xFF0F172A)),
          ),
    );
  }

  Widget _buildDescription(ProDialogTheme t, bool isDark) {
    final bool lightText = t.useGradientBackground || t.useGlassmorphism;

    return Text(
      widget.description!,
      textAlign: TextAlign.center,
      style: t.descriptionStyle ??
          TextStyle(
            fontSize: 14.0,
            height: 1.6,
            color: lightText
                ? Colors.white.withOpacity(0.80)
                : (isDark
                    ? Colors.white.withOpacity(0.55)
                    : const Color(0xFF64748B)),
          ),
    );
  }

  // ── Loading Indicator ──────────────────────────────────────────────────────

  Widget _buildLoadingIndicator(Color typeColor) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(99),
      child: LinearProgressIndicator(
        minHeight: 5.0,
        backgroundColor: typeColor.withOpacity(0.15),
        valueColor: AlwaysStoppedAnimation<Color>(typeColor),
      ),
    );
  }

  // ── Buttons ────────────────────────────────────────────────────────────────

  Widget _buildButtonsSection(ProDialogTheme t, Color typeColor, bool isDark) {
    final List<Widget> buttonWidgets = widget.buttons
        .map((btn) => _buildSingleButton(btn, typeColor, isDark, t))
        .toList();

    if (widget.buttonsAxis == Axis.vertical) {
      return Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (int i = 0; i < buttonWidgets.length; i++) ...[
            buttonWidgets[i],
            if (i < buttonWidgets.length - 1) const SizedBox(height: 10.0),
          ],
        ],
      );
    }

    // Horizontal layout
    return Row(
      children: [
        for (int i = 0; i < buttonWidgets.length; i++) ...[
          Expanded(child: buttonWidgets[i]),
          if (i < buttonWidgets.length - 1) const SizedBox(width: 10.0),
        ],
      ],
    );
  }

  Widget _buildSingleButton(
    DialogButton btn,
    Color typeColor,
    bool isDark,
    ProDialogTheme t,
  ) {
    // Delegate to a custom widget if provided
    if (btn.customWidget != null) {
      return Semantics(
        label: btn.semanticLabel ?? btn.text,
        button: true,
        child: GestureDetector(onTap: btn.onPressed, child: btn.customWidget!),
      );
    }

    final bool isGradientMode = t.useGradientBackground || t.useGlassmorphism;
    final Color btnColor = btn.color ?? typeColor;

    // Build label row (icon + text or spinner)
    Widget labelContent;
    if (btn.isLoading) {
      labelContent = SizedBox(
        width: 18,
        height: 18,
        child: CircularProgressIndicator(
          strokeWidth: 2,
          valueColor: AlwaysStoppedAnimation<Color>(
            btn.isPrimary ? Colors.white : btnColor,
          ),
        ),
      );
    } else {
      labelContent = Row(
        mainAxisAlignment: MainAxisAlignment.center,
        mainAxisSize: MainAxisSize.min,
        children: [
          if (btn.icon != null) ...[
            Icon(
              btn.icon,
              size: 16,
              color: _resolveButtonFgColor(
                btn,
                btnColor,
                isDark,
                isGradientMode,
              ),
            ),
            const SizedBox(width: 6),
          ],
          Text(
            btn.text,
            style: TextStyle(
              fontWeight: FontWeight.w700,
              fontSize: 14,
              letterSpacing: 0.1,
              color: _resolveButtonFgColor(
                btn,
                btnColor,
                isDark,
                isGradientMode,
              ),
            ),
          ),
        ],
      );
    }

    const double minBtnHeight = 48.0;
    final borderRadius = BorderRadius.circular(12.0);

    switch (btn.style) {
      case DialogButtonStyle.outlined:
        return Semantics(
          label: btn.semanticLabel ?? btn.text,
          button: true,
          child: OutlinedButton(
            onPressed: btn.isLoading ? null : btn.onPressed,
            style: OutlinedButton.styleFrom(
              foregroundColor: btnColor,
              side: BorderSide(
                color: isGradientMode
                    ? Colors.white.withOpacity(0.6)
                    : btnColor.withOpacity(0.55),
                width: 1.5,
              ),
              shape: RoundedRectangleBorder(borderRadius: borderRadius),
              minimumSize: const Size(0, minBtnHeight),
            ),
            child: labelContent,
          ),
        );

      case DialogButtonStyle.text:
        return Semantics(
          label: btn.semanticLabel ?? btn.text,
          button: true,
          child: TextButton(
            onPressed: btn.isLoading ? null : btn.onPressed,
            style: TextButton.styleFrom(
              foregroundColor: isGradientMode ? Colors.white70 : btnColor,
              minimumSize: const Size(0, minBtnHeight),
              shape: RoundedRectangleBorder(borderRadius: borderRadius),
            ),
            child: labelContent,
          ),
        );

      case DialogButtonStyle.filled:
      // ignore: no_default_cases, unreachable_switch_default
      default:
        if (btn.isPrimary) {
          return Semantics(
            label: btn.semanticLabel ?? btn.text,
            button: true,
            child: ElevatedButton(
              onPressed: btn.isLoading ? null : btn.onPressed,
              style: ElevatedButton.styleFrom(
                backgroundColor:
                    isGradientMode ? Colors.white.withOpacity(0.22) : btnColor,
                foregroundColor: Colors.white,
                elevation: 0,
                minimumSize: const Size(0, minBtnHeight),
                shape: RoundedRectangleBorder(borderRadius: borderRadius),
              ),
              child: labelContent,
            ),
          );
        } else {
          return Semantics(
            label: btn.semanticLabel ?? btn.text,
            button: true,
            child: ElevatedButton(
              onPressed: btn.isLoading ? null : btn.onPressed,
              style: ElevatedButton.styleFrom(
                backgroundColor: isGradientMode
                    ? Colors.white.withOpacity(0.10)
                    : (isDark
                        ? Colors.white.withOpacity(0.07)
                        : Colors.black.withOpacity(0.04)),
                foregroundColor: isGradientMode
                    ? Colors.white70
                    : (isDark ? Colors.white54 : const Color(0xFF64748B)),
                elevation: 0,
                minimumSize: const Size(0, minBtnHeight),
                shape: RoundedRectangleBorder(borderRadius: borderRadius),
              ),
              child: labelContent,
            ),
          );
        }
    }
  }

  Color _resolveButtonFgColor(
    DialogButton btn,
    Color btnColor,
    bool isDark,
    bool isGradientMode,
  ) {
    if (btn.isLoading) {
      return btn.isPrimary ? Colors.white : btnColor;
    }
    switch (btn.style) {
      case DialogButtonStyle.filled:
        if (btn.isPrimary) {
          return Colors.white;
        }
        if (isGradientMode) return Colors.white70;
        return isDark ? Colors.white54 : const Color(0xFF64748B);
      case DialogButtonStyle.outlined:
        return isGradientMode ? Colors.white : btnColor;
      case DialogButtonStyle.text:
        return isGradientMode ? Colors.white70 : btnColor;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/// Displays a [ProDialog] over the current route.
///
/// Returns a [Future] that resolves to [T] when the dialog is dismissed.
///
/// ## Minimal usage
/// ```dart
/// showProDialog(
///   context,
///   type: DialogType.success,
///   title: 'Done!',
///   description: 'Your operation completed successfully.',
/// );
/// ```
///
/// ## With buttons
/// ```dart
/// showProDialog(
///   context,
///   type: DialogType.error,
///   title: 'Delete Account',
///   description: 'This action cannot be undone.',
///   buttons: [
///     DialogButton(text: 'Cancel', onPressed: () => Navigator.pop(context)),
///     DialogButton(
///       text: 'Delete',
///       isPrimary: true,
///       icon: Icons.delete_forever,
///       onPressed: () { /* delete */ Navigator.pop(context); },
///     ),
///   ],
/// );
/// ```
///
/// ## With custom theme
/// ```dart
/// showProDialog(
///   context,
///   type: DialogType.custom,
///   title: 'Premium',
///   theme: ProDialogTheme(
///     useGlassmorphism: true,
///     animationStyle: DialogAnimationStyle.slideUp,
///     iconAnimationStyle: IconAnimationStyle.pulse,
///     borderRadius: 32,
///   ),
/// );
/// ```
Future<T?> showProDialog<T>(
  BuildContext context, {
  // ── Content ────────────────────────────────────────────────────
  DialogType type = DialogType.custom,
  String? title,
  String? description,
  IconData? icon,
  Color? iconColor,
  Color? iconBackgroundColor,
  Widget? customContent,

  // ── Buttons ────────────────────────────────────────────────────
  List<DialogButton> buttons = const [],
  Axis buttonsAxis = Axis.horizontal,

  // ── State ──────────────────────────────────────────────────────
  bool isLoading = false,

  // ── Behavior ───────────────────────────────────────────────────
  bool barrierDismissible = true,
  bool showCloseButton = false,
  Duration? autoDismissAfter,
  VoidCallback? onDismiss,

  // ── Appearance ─────────────────────────────────────────────────
  ProDialogTheme? theme,
}) {
  return showGeneralDialog<T>(
    context: context,
    barrierDismissible: barrierDismissible,
    barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
    barrierColor: theme?.barrierColor ?? Colors.black.withOpacity(0.52),
    transitionDuration: Duration.zero, // Widget handles its own animation
    pageBuilder: (ctx, _, __) => _ProDialogWidget(
      type: type,
      title: title,
      description: description,
      icon: icon,
      iconColor: iconColor,
      iconBackgroundColor: iconBackgroundColor,
      buttons: buttons,
      buttonsAxis: buttonsAxis,
      customContent: customContent,
      isLoading: isLoading,
      theme: theme,
      autoDismissAfter: autoDismissAfter,
      onDismiss: onDismiss,
      showCloseButton: showCloseButton,
    ),
    transitionBuilder: (ctx, anim, _, child) {
      return child;
    },
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONVENIENCE HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/// Shows a [DialogType.success] dialog with sensible defaults.
Future<T?> showSuccessDialog<T>(
  BuildContext context, {
  String title = 'Success',
  String? description,
  List<DialogButton> buttons = const [],
  ProDialogTheme? theme,
}) {
  return showProDialog<T>(
    context,
    type: DialogType.success,
    title: title,
    description: description,
    buttons: buttons,
    theme: theme,
  );
}

/// Shows a [DialogType.error] dialog with sensible defaults.
Future<T?> showErrorDialog<T>(
  BuildContext context, {
  String title = 'Error',
  String? description,
  List<DialogButton> buttons = const [],
  ProDialogTheme? theme,
}) {
  return showProDialog<T>(
    context,
    type: DialogType.error,
    title: title,
    description: description,
    buttons: buttons,
    theme: theme,
  );
}

/// Shows a [DialogType.warning] dialog with sensible defaults.
Future<T?> showWarningDialog<T>(
  BuildContext context, {
  String title = 'Warning',
  String? description,
  List<DialogButton> buttons = const [],
  ProDialogTheme? theme,
}) {
  return showProDialog<T>(
    context,
    type: DialogType.warning,
    title: title,
    description: description,
    buttons: buttons,
    theme: theme,
  );
}

/// Shows a loading dialog that cannot be dismissed by tapping outside.
/// Call [Navigator.pop(context)] when the operation finishes.
Future<T?> showLoadingDialog<T>(
  BuildContext context, {
  String title = 'Processing…',
  String? description,
  ProDialogTheme? theme,
}) {
  return showProDialog<T>(
    context,
    type: DialogType.custom,
    title: title,
    description: description,
    isLoading: true,
    barrierDismissible: false,
    theme: theme,
  );
}
